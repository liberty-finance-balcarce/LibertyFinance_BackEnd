import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraVenta } from './entities/compra-venta.entity';
import { TransaccionHistoricoCompraService } from '../transaccion-historico-compra/transaccion-historico-compra.service';
import { TransaccionHistoricoVentaService } from '../transaccion-historico-venta/transaccion-historico-venta.service';
import { CreateTransaccionHistoricoCompraDto } from '../transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { CreateTransaccionHistoricoVentaDto } from '../transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class CompraVentaService {
  constructor(
    @InjectRepository(CompraVenta)
    private readonly compraVentaRepo: Repository<CompraVenta>,
    private readonly compraService: TransaccionHistoricoCompraService,
    private readonly ventaService: TransaccionHistoricoVentaService,
  ) { }

  // ─── Público ──────────────────────────────────────────────────────────────

  async comprar(dto: CreateTransaccionHistoricoCompraDto): Promise<ResponseDTO> {
    await this.sumarTenencia(
      dto.dni_usuario,
      dto.id_instrumento,
      Number(dto.cantidad_paquetes ?? 0),
      Number(dto.cantidad_instrumento_comprado ?? 0),
    );

    return this.compraService.create(dto);
  }

  async vender(dto: CreateTransaccionHistoricoVentaDto): Promise<ResponseDTO> {
    const tenencia = await this.getTenencia(dto.dni_usuario, dto.id_instrumento);

    this.validarTenencia(tenencia, dto);

    await this.restarTenencia(
      tenencia,
      Number(dto.cantidad_paquetes ?? 0),
      Number(dto.cantidad_instrumento_vendido ?? 0),
    );

    return this.ventaService.create(dto);
  }

  // ─── Privados ─────────────────────────────────────────────────────────────

  private async getTenencia(dni: number, idInstrumento: number): Promise<CompraVenta> {
    const tenencia = await this.compraVentaRepo.findOne({
      where: { dni_usuario: dni, id_instrumento: idInstrumento },
    });

    if (!tenencia) {
      throw new BadRequestException(
        'No puedes vender un instrumento que no has comprado previamente',
      );
    }

    if (
      Number(tenencia.cantidad_paquetes) <= 0 &&
      Number(tenencia.cantidad_instrumento) <= 0
    ) {
      throw new BadRequestException(
        'Ya has vendido toda tu tenencia de este instrumento financiero',
      );
    }

    return tenencia;
  }

  private async sumarTenencia(
    dni: number,
    idInstrumento: number,
    paquetes: number,
    instrumento: number,
  ): Promise<void> {
    let tenencia = await this.compraVentaRepo.findOne({
      where: { dni_usuario: dni, id_instrumento: idInstrumento },
    });

    if (!tenencia) {
      tenencia = this.compraVentaRepo.create({
        dni_usuario: dni,
        id_instrumento: idInstrumento,
        cantidad_paquetes: 0,
        cantidad_instrumento: 0,
      });
    }

    tenencia.cantidad_paquetes = this.redondear(
      Number(tenencia.cantidad_paquetes) + paquetes,
    );
    tenencia.cantidad_instrumento = this.redondear(
      Number(tenencia.cantidad_instrumento) + instrumento,
    );

    await this.compraVentaRepo.save(tenencia);
  }

  private async restarTenencia(
    tenencia: CompraVenta,
    paquetes: number,
    instrumento: number,
  ): Promise<void> {
    tenencia.cantidad_paquetes = this.redondear(
      Number(tenencia.cantidad_paquetes) - paquetes,
    );
    tenencia.cantidad_instrumento = this.redondear(
      Number(tenencia.cantidad_instrumento) - instrumento,
    );

    await this.compraVentaRepo.save(tenencia);
  }

  private validarTenencia(
    tenencia: CompraVenta,
    dto: CreateTransaccionHistoricoVentaDto,
  ): void {
    const paquetesAVender = Number(dto.cantidad_paquetes ?? 0);
    const instrumentoAVender = Number(dto.cantidad_instrumento_vendido ?? 0);

    if (paquetesAVender > Number(tenencia.cantidad_paquetes)) {
      throw new BadRequestException('No puedes vender más paquetes de los que tienes');
    }

    if (instrumentoAVender > Number(tenencia.cantidad_instrumento)) {
      throw new BadRequestException(
        'No puedes vender más cantidad de instrumento de la que tienes',
      );
    }
  }

  private redondear(valor: number): number {
    return Number(valor.toFixed(8));
  }
}