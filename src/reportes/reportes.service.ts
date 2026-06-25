import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { TransaccionHistoricoCompraService } from '../transaccion-historico-compra/transaccion-historico-compra.service';
import { TransaccionHistoricoVentaService } from '../transaccion-historico-venta/transaccion-historico-venta.service';


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
  saldo_instrumento:number;
}

export interface ResumenData {
  dni_usuario: number;
  total_instrumentos_operados: number;
  resumen: ResumenByInstrumento[];
}



@Injectable()
export class ReportesService {
  
  constructor(

    private readonly compraRepository: TransaccionHistoricoCompraService,
    private readonly ventaRepository: TransaccionHistoricoVentaService,
  ) {}

  async crearInformeResumen(dni_usuario: number): Promise<ResponseDTO<ResumenByInstrumento[]>> {
    console.log('Generando Reporte - RESUMEN:', dni_usuario);
    

    const [compras, ventas] = await Promise.all([
      this.compraRepository.getByDniUsuario(dni_usuario),
      this.ventaRepository.getByDniUsuario(dni_usuario),
    ]);
    console.log(JSON.stringify(compras,null,2));
    console.log(ventas);
  
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

    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen consolidado generado exitosamente',
      data: [],
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
