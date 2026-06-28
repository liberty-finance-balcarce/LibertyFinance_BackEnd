import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionHistoricoCompra } from './entities/transaccion-historico-compra.entity';
import { CreateTransaccionHistoricoCompraDto } from './dto/create-transaccion-historico-compra.dto';
import { UpdateTransaccionHistoricoCompraDTO } from './dto/update-transaccion-historico-compra.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { InstrumentoFinanciero } from 'src/instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class TransaccionHistoricoCompraService {
  constructor(
    @InjectRepository(TransaccionHistoricoCompra)
    private readonly transaccionHistoricoCompraRepository: Repository<TransaccionHistoricoCompra>,

    @InjectRepository(InstrumentoFinanciero)
    private readonly instrumentoFinancieroRepository: Repository<InstrumentoFinanciero>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<ResponseDTO<TransaccionHistoricoCompra[]>> {
    const transaccionHistoricoCompra =
      await this.transaccionHistoricoCompraRepository.find({
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoCompra.length)
      throw new NotFoundException(
        'No se encontraron transacciones historicas de Compras.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacciones historicas de compra obtenidas correctamente.',
      data: transaccionHistoricoCompra,
    };
  }

  async getById(id: number): Promise<ResponseDTO<TransaccionHistoricoCompra>> {
    console.log(id);
    const transaccionHistoricoCompra =
      await this.transaccionHistoricoCompraRepository.findOne({
        where: { id_transaccion_compra: id },
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoCompra)
      throw new NotFoundException(
        'No se encontró ninguna transaccion historica de Compra.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaccion historica de Compra obtenida correctamente.',
      data: transaccionHistoricoCompra,
    };
  }

  async getByDniUsuario(
    dni_usuario: number,
  ): Promise<ResponseDTO<TransaccionHistoricoCompra[]>> {
    const transaccionHistoricoCompra =
      await this.transaccionHistoricoCompraRepository.find({
        where: { dni_usuario: dni_usuario as any },
        relations: ['id_instrumento', 'dni_usuario'],
      });
    if (!transaccionHistoricoCompra.length)
      throw new NotFoundException(
        'No se encontraron transacciones historicas de compras.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacciones historicas de compras obtenidas correctamente.',
      data: transaccionHistoricoCompra,
    };
  }

  async create(
    TransaccionHistoricoCompra: CreateTransaccionHistoricoCompraDto,
  ): Promise<ResponseDTO> {
    const existsInstrumento =
      await this.instrumentoFinancieroRepository.findOne({
        where: { id_instrumento: TransaccionHistoricoCompra.id_instrumento },
      });
    if (!existsInstrumento)
      throw new NotFoundException(
        'No se encontró ningún instrumento financiero con ese ID',
      );

    const existsUsuario = await this.usuarioRepository.findOne({
      where: { dni_usuario: TransaccionHistoricoCompra.dni_usuario },
    });
    if (!existsUsuario)
      throw new NotFoundException('No se encontró ningún usuario con ese DNI');

    const newTransaccionHistoricoCompra =
      this.transaccionHistoricoCompraRepository.create({
        fecha_operacion: new Date(TransaccionHistoricoCompra.fecha_operacion),
        cantidad_paquetes: TransaccionHistoricoCompra.cantidad_paquetes,
        precio_paquete: TransaccionHistoricoCompra.precio_paquete,
        id_instrumento: {
          id_instrumento: TransaccionHistoricoCompra.id_instrumento,
        },
        precio_instrumento: TransaccionHistoricoCompra.precio_instrumento,
        dni_usuario: { dni_usuario: TransaccionHistoricoCompra.dni_usuario },
        cantidad_instrumento_comprado:TransaccionHistoricoCompra.cantidad_instrumento_comprado,
      });
    const res = await this.transaccionHistoricoCompraRepository.save(
      newTransaccionHistoricoCompra,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción historica de compra agregada correctamente.',
    };
  }

  async remove(id: number): Promise<ResponseDTO> {
    const exists = await this.transaccionHistoricoCompraRepository.findOne({
      where: { id_transaccion_compra: id },
    });
    if (!exists)
      throw new NotFoundException('Transacción de compra no encontrada.');
    const res = await this.transaccionHistoricoCompraRepository.softDelete(id);
    if (!res.affected)
      throw new InternalServerErrorException(
        'Error al eliminar la transacción de compra, intentelo mas tarde.',
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción de compra eliminada correctamente.',
    };
  }

  async update(
    id: number,
    updateData: UpdateTransaccionHistoricoCompraDTO,
  ): Promise<ResponseDTO> {
    const transaccionCompra =
      await this.transaccionHistoricoCompraRepository.findOne({
        where: { id_transaccion_compra: id },
      });
    if (!transaccionCompra)
      throw new NotFoundException('Transacción de compra no encontrada.');

    const newTransaccionHistoricoCompra: any = { ...updateData };
    if (updateData.id_instrumento !== undefined) {
      newTransaccionHistoricoCompra.id_instrumento = {
        id_instrumento: updateData.id_instrumento,
      };
    }
    if (updateData.dni_usuario !== undefined) {
      newTransaccionHistoricoCompra.dni_usuario = {
        dni_usuario: updateData.dni_usuario,
      };
    }

    const transaccionCompraActualizada =
      this.transaccionHistoricoCompraRepository.merge(
        transaccionCompra,
        newTransaccionHistoricoCompra,
      );

    const guardarTransaccionCompra =
      await this.transaccionHistoricoCompraRepository.save(
        transaccionCompraActualizada,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transacción de compra actualizada correctamente.',
    };
  }
}
