import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TransaccionHistoricoCompraService } from '../transaccion-historico-compra/transaccion-historico-compra.service';
import { TransaccionHistoricoVentaService } from '../transaccion-historico-venta/transaccion-historico-venta.service';
import { CreateTransaccionHistoricoCompraDto } from '../transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { CreateTransaccionHistoricoVentaDto } from '../transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class CompraVentaService {
  constructor(
    private readonly compraService: TransaccionHistoricoCompraService,
    private readonly ventaService: TransaccionHistoricoVentaService,
  ) { }

  async comprar(dto: CreateTransaccionHistoricoCompraDto): Promise<ResponseDTO> {
    return this.compraService.create(dto);
  }

  async vender(dto: CreateTransaccionHistoricoVentaDto): Promise<ResponseDTO> {
    const compras = await this.getComprasDelInstrumento(dto.dni_usuario, dto.id_instrumento);

    if (!compras.length) {
      throw new BadRequestException('No puedes vender un instrumento que no has comprado previamente');
    }

    const ventas = await this.getVentasDelInstrumento(dto.dni_usuario, dto.id_instrumento);

    this.validarTenencia(compras, ventas, dto);

    return this.ventaService.create(dto);
  }


  private async getComprasDelInstrumento(dni: number, idInstrumento: number): Promise<any[]> {
    const { data } = await this.compraService.getByDniUsuario(dni);
    return data?.filter((c) => c.id_instrumento?.id_instrumento === idInstrumento) ?? [];
  }

  private async getVentasDelInstrumento(dni: number, idInstrumento: number): Promise<any[]> {
    try {
      const { data } = await this.ventaService.getByDniUsuario(dni);
      return data?.filter((v: any) => v.id_instrumento?.id_instrumento === idInstrumento) ?? [];
    } catch (error) {
      if (error instanceof NotFoundException) return []; // primer venta del usuario: sin historial previo
      throw error;
    }
  }

  private sumarCampo(items: any[], campo: string): number {
    return items.reduce((acc, item) => acc + Number(item[campo] ?? 0), 0);
  }

  private validarTenencia(
    compras: any[],
    ventas: any[],
    dto: CreateTransaccionHistoricoVentaDto,
  ): void {
    const tenenciaPaquetes =
      this.sumarCampo(compras, 'cantidad_paquetes') -
      this.sumarCampo(ventas, 'cantidad_paquetes');

    const tenenciaInstrumento = Number(
      (
        this.sumarCampo(compras, 'cantidad_instrumento_comprado') -
        this.sumarCampo(ventas, 'cantidad_instrumento_vendido')
      ).toFixed(8),
    );

    if (tenenciaPaquetes <= 0 && tenenciaInstrumento <= 0) {
      throw new BadRequestException('Ya has vendido toda tu tenencia de este instrumento financiero');
    }

    const paquetesAVender = Number(dto.cantidad_paquetes ?? 0);
    const instrumentoAVender = Number(dto.cantidad_instrumento_vendido ?? 0);

    if (paquetesAVender > tenenciaPaquetes) {
      throw new BadRequestException('No puedes vender más paquetes de los que tienes');
    }

    if (instrumentoAVender > tenenciaInstrumento) {
      throw new BadRequestException('No puedes vender más cantidad de instrumento de la que tienes');
    }
  }
}