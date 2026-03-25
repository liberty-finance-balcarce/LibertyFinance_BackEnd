import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionHistoricoVenta } from './transaccion_historico_venta.entity';
import { CreateTransaccionHistoricoVentaDto } from '../dto/transaccion_historico_venta.dto';

@Injectable()
export class TransaccionHistoricoVentaService {
    constructor (
        @InjectRepository(TransaccionHistoricoVenta)
        private readonly transaccionRepo: Repository<TransaccionHistoricoVenta>
    ) {}

async create(dto: CreateTransaccionHistoricoVentaDto): Promise<TransaccionHistoricoVenta> {
    const nuevaTransaccion = this.transaccionRepo.create(dto);
    return await this.transaccionRepo.save(nuevaTransaccion);
}

async findAll(): Promise<TransaccionHistoricoVenta[]>{
    return await this.transaccionRepo.find({ relations: ['id_instrumento', 'dni_usuario'] });
}

async findOne(id: number): Promise<TransaccionHistoricoVenta> {
  const transaccion = await this.transaccionRepo.findOne({ where: { id_transaccion_venta: id } });
  if (!transaccion) throw new NotFoundException('Transaccion no encontrada');
  return transaccion;
}

}
