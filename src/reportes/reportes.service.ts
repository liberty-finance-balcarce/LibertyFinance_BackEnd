import { Injectable, HttpStatus } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { TransaccionHistoricoCompraService } from '../transaccion-historico-compra/transaccion-historico-compra.service';
import { TransaccionHistoricoVentaService } from '../transaccion-historico-venta/transaccion-historico-venta.service';

interface DatosConsolidados {
  nombre: string;
  logoUrl: string;
  tipo: string;
  // Acumuladores de Paquetes
  paquetesComprados: number;
  paquetesVendidos: number;
  // Acumuladores de Activo Puro (Cripto / RWA)
  instrumentoComprado: number;
  instrumentoVendido: number;
  // Flujos de caja monetarios
  montoInvertidoTotal: number;  // Dinero total gastado en compras
  montoRecuperadoTotal: number; // Dinero total obtenido en ventas
  // Rastreo de la última cotización conocida
  ultimaFechaConocida: Date | null;
  ultimoPrecioInstrumento: number;
}

export interface ResumenByInstrumento {
  id_instrumento: number;
  nombre: string;
  logo_url: string;
  tipo_instrumento: string;
  //Paquetes
  total_paquetes_comprados: number;
  total_paquetes_vendidos: number;
  tenencia_actual_paquetes: number;
  // Instrumentos
  total_instrumento_comprado: number;
  total_instrumento_vendido: number;
  tenencia_actual_instrumento: number;
  // Métricas Financieras Valuadas
  valor_promedio_compra_paquete: number;
  valor_actual_mercado_instrumento: number;
  saldo_valuado_actual_cartera: number; // tenencia_actual_instrumento * valor_actual_mercado_instrumento
  ganancia_perdida_monetaria: number;   // (Saldo Valuado + Recuperado) - Invertido
  porcentaje_retorno: number;           // Rendimiento porcentual real sobre inversión inicial
}

@Injectable()
export class ReportesService {
  
  constructor(
    private readonly compraService: TransaccionHistoricoCompraService,
    private readonly ventaService: TransaccionHistoricoVentaService,
  ) {}

  async crearInformeResumen(dni_usuario: number): Promise<ResponseDTO<ResumenByInstrumento[]>> {
    console.log('Generando Reporte Financiero Consolidado - RESUMEN:', dni_usuario);
    
    let comprasRaw: any[] = [];
    let ventasRaw: any[] = [];  

    try {
      const resCompras = await this.compraService.getByDniUsuario(dni_usuario);
      comprasRaw = resCompras.data || [];
    } catch (e) {
      console.log(`El usuario ${dni_usuario} no registra compras.`);
    }

    try {
      const resVentas = await this.ventaService.getByDniUsuario(dni_usuario);
      ventasRaw = resVentas.data || [];
    } catch (e) {
      console.log(`El usuario ${dni_usuario} no registra ventas.`);
    }

    if (comprasRaw.length === 0 && ventasRaw.length === 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Sin movimientos comerciales para este usuario.',
        data: [],
      };
    }

    const resumenMap = new Map<number, DatosConsolidados>();

    // 1. Procesamos COMPRAS
    comprasRaw.forEach((c) => {
      const inst = c.id_instrumento;
      if (!inst) return;

      const instId = inst.id_instrumento;
      const cantPaquetes = Number(c.cantidad_paquetes || 0);
      const precioPaquete = Number(c.precio_paquete || 0);
      const cantInstrumento = Number(c.cantidad_instrumento_comprado || 0);
      const precioInst = Number(c.precio_instrumento || 0);
      const fechaOp = new Date(c.fecha_operacion);

      if (!resumenMap.has(instId)) {
        resumenMap.set(instId, this.inicializarNodoMapa(inst));
      }

      const datos = resumenMap.get(instId)!;
      datos.paquetesComprados += cantPaquetes;
      datos.instrumentoComprado += cantInstrumento;
      datos.montoInvertidoTotal += (cantPaquetes * precioPaquete); // Dinero real invertido

      // Guardamos la cotización si es la más reciente
      if (!datos.ultimaFechaConocida || fechaOp > datos.ultimaFechaConocida) {
        datos.ultimaFechaConocida = fechaOp;
        datos.ultimoPrecioInstrumento = precioInst;
      }
    });

    // 2. Procesamos VENTAS
    ventasRaw.forEach((v) => {
      const inst = v.id_instrumento;
      if (!inst) return;

      const instId = inst.id_instrumento;
      const cantPaquetes = Number(v.cantidad_paquetes || 0);
      const precioPaquete = Number(v.precio_paquete || 0);
      const cantInstrumento = Number(v.cantidad_instrumento_vendido || 0);
      const precioInst = Number(v.precio_instrumento || 0);
      const fechaOp = new Date(v.fecha_operacion);

      if (!resumenMap.has(instId)) {
        resumenMap.set(instId, this.inicializarNodoMapa(inst));
      }

      const datos = resumenMap.get(instId)!;
      datos.paquetesVendidos += cantPaquetes;
      datos.instrumentoVendido += cantInstrumento;
      datos.montoRecuperadoTotal += (cantPaquetes * precioPaquete); // Dinero real recuperado

      // Guardamos la cotización si es la más reciente
      if (!datos.ultimaFechaConocida || fechaOp > datos.ultimaFechaConocida) {
        datos.ultimaFechaConocida = fechaOp;
        datos.ultimoPrecioInstrumento = precioInst;
      }
    });

    // 3. Mapeamos el arreglo final aplicando las fórmulas exactas de negocio
    const resumenFinal: ResumenByInstrumento[] = Array.from(resumenMap.entries()).map(([id_instrumento, valores]) => {
      
      const tenenciaActualPaquetes = valores.paquetesComprados - valores.paquetesVendidos;
      const tenenciaActualInstrumento = valores.instrumentoComprado - valores.instrumentoVendido;

      // Precio de costo promedio por paquete comprado
      const valorPromedioCompraPaquete = valores.paquetesComprados > 0
        ? Number((valores.montoInvertidoTotal / valores.paquetesComprados).toFixed(2))
        : 0;

      // Cotización de mercado basada en la última operación histórica registrada
      const valorActualMercadoInstrumento = valores.ultimoPrecioInstrumento;

      // Valuación actual en dinero de la tenencia remanente de instrumentos puros
      const saldoValuadoActualCartera = Number((tenenciaActualInstrumento * valorActualMercadoInstrumento).toFixed(2));

      // P&L Total: (Lo que tengo valuado hoy + Lo que ya retiré vendiendo) - Lo que puse al principio
      const gananciaPerdidaMonetaria = Number(
        (saldoValuadoActualCartera + valores.montoRecuperadoTotal - valores.montoInvertidoTotal).toFixed(2)
      );

      // ROI (Retorno sobre la inversión inicial)
      const porcentajeRetorno = valores.montoInvertidoTotal > 0
        ? Number(((gananciaPerdidaMonetaria / valores.montoInvertidoTotal) * 100).toFixed(2))
        : 0;

      return {
        id_instrumento,
        nombre: valores.nombre,
        logo_url: valores.logoUrl,
        tipo_instrumento: valores.tipo,
        
        total_paquetes_comprados: valores.paquetesComprados,
        total_paquetes_vendidos: valores.paquetesVendidos,
        tenencia_actual_paquetes: tenenciaActualPaquetes >= 0 ? tenenciaActualPaquetes : 0,
        
        total_instrumento_comprado: valores.instrumentoComprado,
        total_instrumento_vendido: valores.instrumentoVendido,
        tenencia_actual_instrumento: tenenciaActualInstrumento >= 0 ? tenenciaActualInstrumento : 0,

        valor_promedio_compra_paquete: valorPromedioCompraPaquete,
        valor_actual_mercado_instrumento: valorActualMercadoInstrumento,
        saldo_valuado_actual_cartera: saldoValuadoActualCartera,
        ganancia_perdida_monetaria: gananciaPerdidaMonetaria,
        percentage_retorno: porcentajeRetorno, // Cambiado el cálculo del mock anterior (*180) por el estándar universal (*100)
        porcentaje_retorno: porcentajeRetorno,
      };
    });

    console.log('Reporte Financiero listo para enviar:', resumenFinal);

    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen financiero por instrumento generado correctamente.',
      data: resumenFinal,
    };
  }

  // Helper para inicializar el objeto del Map de forma limpia
  private inicializarNodoMapa(inst: any): DatosConsolidados {
    return {
      nombre: inst.nombre_instrumento,
      logoUrl: inst.logo_url,
      tipo: inst.tipo_instrumento,
      paquetesComprados: 0,
      paquetesVendidos: 0,
      instrumentoComprado: 0,
      instrumentoVendido: 0,
      montoInvertidoTotal: 0,
      montoRecuperadoTotal: 0,
      ultimaFechaConocida: null,
      ultimoPrecioInstrumento: 0,
    };
  }
}






    /*
    const [compras, ventas] = await Promise.all([
      this.compraService.getByDniUsuario(dni_usuario),
      this.ventaService.getByDniUsuario(dni_usuario),
    ]);*/

    //const compras = await this.compraService.getByDniUsuario(dni_usuario);
    //const ventas = await this.ventaService.getByDniUsuario(dni_usuario);
    //console.log("*****************************");
    //console.log(compras);
    //console.log("*****************************");    
    //console.log(ventas);   //console.log(JSON.stringify(ventas,null,2));
    //console.log("*****************************");    
    
    /*
    resumenFinal = [
      {id_instrumento:1,
      nombre: "BTC",
      logo_url: "http://bitcoin.com",
      tipo_instrumento: "No Tradicional",
      total_comprado: 4,
      total_vendido: 1,
      balance_total: 3,
      valor_promedio:64000,
      valor_actual:68000,
      saldo_instrumento:12000
    },
      {id_instrumento:2,
      nombre: "ETHER",
      logo_url: "http://ethereum.com",
      tipo_instrumento: "No Tradicional",
      total_comprado:4,
      total_vendido: 2,
      balance_total: 2,
      valor_promedio:3000,
      valor_actual:2100,
      saldo_instrumento:-1800}     
    ];
*/
/*
    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen consolidado generado exitosamente',
      data: [],
    };
  }
}
*/
