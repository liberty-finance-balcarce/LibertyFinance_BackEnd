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
    try {
      const comprasResponse = await this.transaccionHistoricoCompraService.getByDniUsuario(ventaDto.dni_usuario);
      const comprasDelInstrumento = comprasResponse.data?.filter(
        (compra) =>
          compra.id_instrumento?.id_instrumento === ventaDto.id_instrumento
      );

      if (comprasDelInstrumento?.length === 0) {
        throw new BadRequestException('No puedes vender un instrumento que no has comprado previamente');
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
