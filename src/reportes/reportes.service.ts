import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { TransaccionHistoricoCompra } from '../transaccion-historico-compra/entities/transaccion-historico-compra.entity'; 
import { TransaccionHistoricoVenta } from '../transaccion-historico-venta/entities/transaccion-historico-venta.entity';
import { InstrumentoFinanciero } from '../instrumentos-financieros/entities/instrumento-financiero.entity';

// Definimos una interfaz limpia para lo que va a guardar nuestro mapa en memoria
interface DatosConsolidados {
  nombre: string;
  logoUrl: string;
  tipo: string;
  totalComprado: number;
  totalVendido: number;
  balance: number;
}

export interface ResumenByInstrumento {
  id_instrumento: number;
  nombre: string;
  logo_url: string;
  tipo_instrumento: string;
  total_comprado: number;
  total_vendido: number;
  balance_total: number;
  valor_promedio: number;
  valor_actual: number;
}

export interface ResumenData {
  dni_usuario: number;
  total_instrumentos_operados: number;
  resumen: ResumenByInstrumento[];
}



@Injectable()
export class ReportesService {
  
  constructor(
    @InjectRepository(TransaccionHistoricoCompra)
    private readonly compraRepository: Repository<TransaccionHistoricoCompra>,

    @InjectRepository(TransaccionHistoricoVenta)
    private readonly ventaRepository: Repository<TransaccionHistoricoVenta>,
  ) {}

  async crearInformeResumen(dni_usuario: number): Promise<ResponseDTO<ResumenData>> {
    console.log('Generando Reporte - RESUMEN:', dni_usuario);

    // 1. Traemos el histórico de compras y ventas en paralelo mapeando la relación completa
    const [compras, ventas] = await Promise.all([
      this.compraRepository.find({
        where: { dni_usuario: { dni_usuario: dni_usuario } },
        relations: ['id_instrumento'],
      }),
      this.ventaRepository.find({
        where: { dni_usuario: { dni_usuario: dni_usuario } },
        relations: ['id_instrumento'],
      }),
    ]);

    // 2. Instanciamos nuestro mapa usando el ID numérico del instrumento como Key
    const resumenMap = new Map<number, DatosConsolidados>();

    // 3. Procesamos el histórico de COMPRAS
    compras.forEach((c) => {
      // id_instrumento es una instancia de la entidad InstrumentoFinanciero gracias a 'relations'
      const instrumento: InstrumentoFinanciero = c.id_instrumento;
      const instId = instrumento.id_instrumento;
      const monto = Number(c.precio_instrumento);

      // Si el instrumento no está en el mapa, lo inicializamos con los datos reales de su entidad
      if (!resumenMap.has(instId)) {
        resumenMap.set(instId, {
          nombre: instrumento.nombre_instrumento,
          logoUrl: instrumento.logo_url,
          tipo: instrumento.tipo_instrumento,
          totalComprado: 0,
          totalVendido: 0,
          balance: 0,
        });
      }

      const datos = resumenMap.get(instId)!;
      datos.totalComprado += monto;
      datos.balance += monto;
    });

    // 4. Procesamos el histórico de VENTAS
    ventas.forEach((v) => {
      const instrumento: InstrumentoFinanciero = v.id_instrumento;
      const instId = instrumento.id_instrumento;
      const monto = Number(v.precio_instrumento);

      if (!resumenMap.has(instId)) {
        resumenMap.set(instId, {
          nombre: instrumento.nombre_instrumento,
          logoUrl: instrumento.logo_url,
          tipo: instrumento.tipo_instrumento,
          totalComprado: 0,
          totalVendido: 0,
          balance: 0,
        });
      }

      const datos = resumenMap.get(instId)!;
      datos.totalVendido += monto;
      datos.balance -= monto; // Restamos porque es una venta
    });

    // 5. Estructuramos el array final para el ResponseDTO aplicando el redondeo matemático a 2 decimales
    let resumenFinal: any[] =Array.from(resumenMap.entries()).map(([id_instrumento, valores]) => ({
      id_instrumento,
      nombre: valores.nombre,
      logo_url: valores.logoUrl,
      tipo_instrumento: valores.tipo,
      total_comprado: Number(valores.totalComprado.toFixed(2)),
      total_vendido: Number(valores.totalVendido.toFixed(2)),
      balance_total: Number(valores.balance.toFixed(2)),
    }));
   
    resumenFinal = [
      {id_instrumento:1,
      nombre: "BTC",
      logo_url: "http://bitcoin.com",
      tipo_instrumento: "No Tradicional",
      total_comprado: 4,
      total_vendido: 1,
      balance_total: 3,
      valor_promedio:64000,
      valor_actual:68000},
      {id_instrumento:2,
      nombre: "ETHER",
      logo_url: "http://ethereum.com",
      tipo_instrumento: "No Tradicional",
      total_comprado:4,
      total_vendido: 2,
      balance_total: 2,
      valor_promedio:3000,
      valor_actual:2100}     
    ];



    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen consolidado generado exitosamente',
      data: {
        dni_usuario,
        total_instrumentos_operados: resumenFinal.length,
        resumen: resumenFinal,
      },
    };
  }
}

/*
async crearInformeResumen(dni_usuario:number):Promise<ResponseDTO>{
    console.log(dni_usuario);

    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen enviado exitosamente',
    };
}*/
