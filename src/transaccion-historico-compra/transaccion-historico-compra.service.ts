import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionHistoricoCompra } from './entities/transaccion-historico-compra.entity';
import { CreateTransaccionHistoricoCompraDto } from './dto/create-transaccion-historico-compra.dto';
import { UpdateTransaccionHistoricoCompraDTO } from './dto/update-transaccion-historico-compra.dto';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class TransaccionHistoricoCompraService {
    constructor(
        @InjectRepository(TransaccionHistoricoCompra)
        private readonly transaccionHistoricoCompraRepository: Repository<TransaccionHistoricoCompra>
    ) { }


    async findAll(): Promise<ResponseDTO> {

        const transaccionHistoricoCompra = await this.transaccionHistoricoCompraRepository.find({ relations: ['id_instrumento', 'dni_usuario'] });
        if (!transaccionHistoricoCompra.length) throw new NotFoundException("No se encontraron transacciones historicas de Compras.")
        return {
            statusCode: HttpStatus.OK,
            message: "Transacciones historicas de compra obtenidas correctamente.",
            data: transaccionHistoricoCompra,
        }
    }

    async getById(id: number): Promise<ResponseDTO> {

        const transaccionHistoricoCompra = await this.transaccionHistoricoCompraRepository.findOne({ where: { id_transaccion_compra: id }, relations: ['id_instrumento', 'dni_usuario'] });
        if (!transaccionHistoricoCompra) throw new NotFoundException("No se encontró ninguna transaccion historica de Compra.")
        return {
            statusCode: HttpStatus.OK,
            message: "Transaccion historica de Compra obtenida correctamente.",
            data: transaccionHistoricoCompra,
        }
    }

    async getByDniUsuario(dni_usuario: string): Promise<ResponseDTO> {

    const transaccionHistoricoCompra = await this.transaccionHistoricoCompraRepository.find({ where: { dni_usuario: dni_usuario }, relations: ['id_instrumento', 'dni_usuario'] });
    if (!transaccionHistoricoCompra) throw new NotFoundException("No se encontraron transacciones historicas de compras.")
        return {
            statusCode: HttpStatus.OK,
            message: "Transacciones historicas de compras obtenidas correctamente.",
            data: transaccionHistoricoCompra,
        }
    }

    async create(transaccionHistoricoCompra: CreateTransaccionHistoricoCompraDto): Promise<ResponseDTO> {
        
        const newTransaccionHistoricoCompra = this.transaccionHistoricoCompraRepository.create({
            fecha_operacion: new Date(transaccionHistoricoCompra.fecha_operacion),
            id_instrumento: { id_instrumento: transaccionHistoricoCompra.id_instrumento },
            precio_instrumento: transaccionHistoricoCompra.precio_instrumento,
            dni_usuario: { dni_usuario: transaccionHistoricoCompra.dni_usuario },
        });
        const res = await this.transaccionHistoricoCompraRepository.save(newTransaccionHistoricoCompra);
        return {
            statusCode: HttpStatus.OK,
            message: "Transacción historica de compra agregada correctamente.",
            data: res,
        }
    }

    async remove(id: number): Promise<ResponseDTO> {

        const exists = await this.transaccionHistoricoCompraRepository.findOne({ where: { id_transaccion_compra: id } })
        if (!exists) throw new NotFoundException("Transacción de compra no encontrada.")
        const res = await this.transaccionHistoricoCompraRepository.delete(id);
        if (!res.affected) throw new InternalServerErrorException("Error al eliminar la transacción de compra.")
        return {
            statusCode: HttpStatus.OK,
            message: "Transacción de compra eliminada correctamente."
        }
    }

    async update(id: number, updateData: UpdateTransaccionHistoricoCompraDTO): Promise<ResponseDTO> {

        const transaccionCompra = await this.transaccionHistoricoCompraRepository.findOne({ where: { id_transaccion_compra: id } });
        if (!transaccionCompra) throw new NotFoundException("Transacción de compra no encontrada.");

        const newTransaccionHistoricoCompra: any = { ...updateData };
        if (updateData.id_instrumento !== undefined) {
            newTransaccionHistoricoCompra.id_instrumento = { id_instrumento: updateData.id_instrumento };
        }
        if (updateData.dni_usuario !== undefined) {
            newTransaccionHistoricoCompra.dni_usuario = { dni_usuario: updateData.dni_usuario };
        }

        const transaccionCompraActualizada = this.transaccionHistoricoCompraRepository.merge(
            transaccionCompra,
            newTransaccionHistoricoCompra,
        );

        const guardarTransaccionCompra = await this.transaccionHistoricoCompraRepository.save(transaccionCompraActualizada);
        return {
            statusCode: HttpStatus.OK,
            message: "Transacción de compra actualizada correctamente.",
            data: guardarTransaccionCompra
        }
    } 
}
