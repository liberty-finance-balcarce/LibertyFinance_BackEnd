import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TransaccionHistoricoCompraService } from '../transaccion-historico-compra/transaccion-historico-compra.service';
import { TransaccionHistoricoVentaService } from '../transaccion-historico-venta/transaccion-historico-venta.service';
import { CreateTransaccionHistoricoCompraDto } from '../transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { CreateTransaccionHistoricoVentaDto } from '../transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class CompraVentaService {
  constructor(
    private readonly transaccionHistoricoCompraService: TransaccionHistoricoCompraService,
    private readonly transaccionHistoricoVentaService: TransaccionHistoricoVentaService,
  ) { }

  async comprar(compraDto: CreateTransaccionHistoricoCompraDto): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.create(compraDto);
  }

  async vender(ventaDto: CreateTransaccionHistoricoVentaDto): Promise<ResponseDTO> {
    const comprasResponse = await this.transaccionHistoricoCompraService.getByDniUsuario(ventaDto.dni_usuario);
    const comprasDelInstrumento = comprasResponse.data?.filter(
      (compra) =>
        compra.id_instrumento?.id_instrumento === ventaDto.id_instrumento
    ) || [];

    if (comprasDelInstrumento.length === 0) {
      throw new BadRequestException('No puedes vender un instrumento que no has comprado previamente');
    }

    const totalPaquetesComprados = comprasDelInstrumento.reduce((acc, curr: any) => acc + Number(curr.cantidad_paquetes || 0), 0);
    const totalInstrumentoComprado = comprasDelInstrumento.reduce((acc, curr: any) => acc + Number(curr.cantidad_instrumento_comprado || 0), 0);

    let ventasDelInstrumento: any[] = [];
    try {
      const ventasResponse = await this.transaccionHistoricoVentaService.getByDniUsuario(ventaDto.dni_usuario);
      ventasDelInstrumento = ventasResponse.data?.filter(
        (venta: any) => venta.id_instrumento?.id_instrumento === ventaDto.id_instrumento
      ) || [];

      const totalPaquetesVendidos = ventasDelInstrumento.reduce((acc, curr) => acc + Number(curr.cantidad_paquetes || 0), 0);
      const totalInstrumentoVendido = ventasDelInstrumento.reduce((acc, curr) => acc + Number(curr.cantidad_instrumento_vendido || 0), 0);

      const tenenciaActualPaquetes = totalPaquetesComprados - totalPaquetesVendidos;
      const tenenciaActualInstrumento = Number((totalInstrumentoComprado - totalInstrumentoVendido).toFixed(8));

      const paquetesAVender = Number(ventaDto.cantidad_paquetes || 0);
      const instrumentoAVender = Number(ventaDto.cantidad_instrumento_vendido || 0);

      if (tenenciaActualPaquetes <= 0 && tenenciaActualInstrumento <= 0) {
        throw new BadRequestException('Ya has vendido toda tu tenencia de este instrumento financiero');
      }

      if (paquetesAVender > tenenciaActualPaquetes) {
        throw new BadRequestException(`No puedes vender mas paquetes de los que tienes`);
      }

      if (instrumentoAVender > tenenciaActualInstrumento) {
        throw new BadRequestException(`No puedes vender mas cantidad de instrumento de la que tienes`);
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('No tienes compras registradas para poder vender');
      }
      throw error;
    }

    return await this.transaccionHistoricoVentaService.create(ventaDto);
  }
}
