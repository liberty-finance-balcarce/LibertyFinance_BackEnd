import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionHistoricoVenta } from './entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from './dto/create-transaccion-historico-venta.dto';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class TransaccionHistoricoVentaService {
    constructor (
        @InjectRepository(TransaccionHistoricoVenta)
        private readonly transaccionHistoricoVentaRepository: Repository<TransaccionHistoricoVenta>
    ) {}

    
    async findAll(): Promise<ResponseDTO>{
        const transaccionVenta = await this.transaccionHistoricoVentaRepository.find({ relations: ['id_instrumento', 'dni_usuario'] });
        if(!transaccionVenta.length) throw new NotFoundException ("No se encontraron transacciones.")
            return {
        statusCode: HttpStatus.OK,
        message: "Transacciones obtenidas correctamente.",
        data: transaccionVenta,
    }
}

async getById(id: number): Promise<ResponseDTO> {
    const transaccionVenta = await this.transaccionHistoricoVentaRepository.findOne({ relations: ['id_instrumento', 'dni_usuario'] });
    if(!transaccionVenta.length) throw new NotFoundException ("No se encontraron transacciones.")
        return {
    statusCode: HttpStatus.OK,
    message: "Transacciones obtenidas correctamente.",
    data: transaccionVenta,
}
}

async create(dto: CreateTransaccionHistoricoVentaDto): Promise<TransaccionHistoricoVenta> {
    const nuevaTransaccion = this.transaccionHistoricoVentaRepository.create(dto);
    return await this.transaccionHistoricoVentaRepository.save(nuevaTransaccion);
}
// TODO: HACER DELETE
async remove


// TODO: HACER UPDATE
async update(id: number, updateData: UpdateTransaccionHistoricoVentaDTO): Promise<ResponseDTO> {
    const transaccionVenta = await this.transaccionHistoricoVentaRepository.findOne({where: {id_instrumento: id}})
    if(!transaccionVenta) throw new NotFoundException ("No se encontraron transacciones.")
        const transaccionActualizada = this.transaccionHistoricoVentaRepository.merge(
    transaccionVenta,
    updateData
    )
}



}