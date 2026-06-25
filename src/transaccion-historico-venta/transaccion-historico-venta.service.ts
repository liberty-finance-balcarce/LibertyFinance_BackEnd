import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionHistoricoVenta } from './entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from './dto/create-transaccion-historico-venta.dto';
import { UpdateTransaccionHistoricoVentaDTO } from './dto/update-transaccion-historico-venta.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { InstrumentoFinanciero } from '../instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class TransaccionHistoricoVentaService {
  constructor(
    @InjectRepository(TransaccionHistoricoVenta)
    private readonly transaccionHistoricoVentaRepository: Repository<TransaccionHistoricoVenta>,
    @InjectRepository(InstrumentoFinanciero)
    private readonly instrumentoFinancieroRepository: Repository<InstrumentoFinanciero>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<ResponseDTO<TransaccionHistoricoVenta[]>> {
    const transaccionHistoricoVenta =
      await this.transaccionHistoricoVentaRepository.find({
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoVenta.length)
      throw new NotFoundException(
        'No se encontraron transacciones historicas de ventas.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacciones historicas de ventas obtenidas correctamente.',
      data: transaccionHistoricoVenta,
    };
  }

  async getById(id: number): Promise<ResponseDTO<TransaccionHistoricoVenta>> {
    const transaccionHistoricoVenta =
      await this.transaccionHistoricoVentaRepository.findOne({
        where: { id_transaccion_venta: id },
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoVenta)
      throw new NotFoundException(
        'No se encontró ninguna transaccion historica de venta.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaccion historica de venta obtenida correctamente.',
      data: transaccionHistoricoVenta,
    };
  }

  async getByDniUsuario(
    dni_usuario: number,
  ): Promise<ResponseDTO<TransaccionHistoricoVenta[]>> {
    const transaccionHistoricoVenta =
      await this.transaccionHistoricoVentaRepository.find({
        where: { dni_usuario: dni_usuario as any},
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoVenta.length)
      throw new NotFoundException(
        'No se encontraron transacciones historicas de ventas.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacciones historicas de ventas obtenidas correctamente.',
      data: transaccionHistoricoVenta,
    };
  }

  async create(
    transaccionHistoricoVenta: CreateTransaccionHistoricoVentaDto,
  ): Promise<ResponseDTO> {
    const existsInstrumento =
      await this.instrumentoFinancieroRepository.findOne({
        where: { id_instrumento: transaccionHistoricoVenta.id_instrumento },
      });
    if (!existsInstrumento)
      throw new NotFoundException(
        'No se encontró ningún instrumento financiero con ese ID',
      );
    const existsUsuario = await this.usuarioRepository.findOne({
      where: { dni_usuario: transaccionHistoricoVenta.dni_usuario },
    });
    if (!existsUsuario)
      throw new NotFoundException('No se encontró ningún usuario con ese DNI');
    const newTransaccionHistoricoVenta =
      this.transaccionHistoricoVentaRepository.create({
        fecha_operacion: new Date(transaccionHistoricoVenta.fecha_operacion),
        id_instrumento: {
          id_instrumento: transaccionHistoricoVenta.id_instrumento,
        },
        precio_instrumento: transaccionHistoricoVenta.precio_instrumento,
        dni_usuario: { dni_usuario: transaccionHistoricoVenta.dni_usuario },
      });
    const res = await this.transaccionHistoricoVentaRepository.save(
      newTransaccionHistoricoVenta,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción historica de venta agregada correctamente.',
    };
  }

  async remove(id: number): Promise<ResponseDTO> {
    const exists = await this.transaccionHistoricoVentaRepository.findOne({
      where: { id_transaccion_venta: id },
    });
    if (!exists)
      throw new NotFoundException('Transacción de venta no encontrada.');
    const res = await this.transaccionHistoricoVentaRepository.softDelete(id);
    if (!res.affected)
      throw new InternalServerErrorException(
        'Error al eliminar la transacción de venta.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción de venta eliminada correctamente.',
    };
  }

  async update(
    id: number,
    updateData: UpdateTransaccionHistoricoVentaDTO,
  ): Promise<ResponseDTO> {
    const transaccionVenta =
      await this.transaccionHistoricoVentaRepository.findOne({
        where: { id_transaccion_venta: id },
      });
    if (!transaccionVenta)
      throw new NotFoundException('Transacción de venta no encontrada.');

    const newTransaccionHistoricoVenta: any = { ...updateData };
    if (updateData.id_instrumento !== undefined) {
      newTransaccionHistoricoVenta.id_instrumento = {
        id_instrumento: updateData.id_instrumento,
      };
    }
    if (updateData.dni_usuario !== undefined) {
      newTransaccionHistoricoVenta.dni_usuario = {
        dni_usuario: updateData.dni_usuario,
      };
    }

    const transaccionVentaActualizada =
      this.transaccionHistoricoVentaRepository.merge(
        transaccionVenta,
        newTransaccionHistoricoVenta,
      );
    const guardarTransaccionVenta =
      await this.transaccionHistoricoVentaRepository.save(
        transaccionVentaActualizada,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción de venta actualizada correctamente.',
    };
  }
}
