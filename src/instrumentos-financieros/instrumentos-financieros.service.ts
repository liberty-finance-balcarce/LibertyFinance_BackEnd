import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { InstrumentosFinancieros, Riesgo } from './instrumentos-financieros.entity';
import { CreateInstrumentoFinancieroDto } from './instrumentos-financieros.dto';

@Injectable()
export class InstrumentosFinancierosService {
  constructor(
    @InjectRepository(InstrumentosFinancieros)
    private readonly repository: Repository<InstrumentosFinancieros>,
  ) {}

  async getAll(): Promise<InstrumentosFinancieros[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<InstrumentosFinancieros> {
    const instrumento = await this.repository.findOne({
      where: { id_instrumento: id },
    });

    if (!instrumento) {
      throw new NotFoundException('El instrumento financiero no existe');
    }

    return instrumento;
  }

  async filterByName(nombre: string): Promise<InstrumentosFinancieros[]> {
    return this.repository.find({
      where: {
        nombre_instrumento: ILike(`%${nombre}%`),
      },
    });
  }

  async filterByRiesgo(riesgo: Riesgo): Promise<InstrumentosFinancieros[]> {
    return this.repository.find({
      where: { riesgo },
    });
  }

  async create(
    dto: CreateInstrumentoFinancieroDto,
  ): Promise<InstrumentosFinancieros> {
    const exists = await this.repository.exists({
      where: { nombre_instrumento: dto.nombre_instrumento },
    });

    if (exists) {
      throw new BadRequestException(
        'El instrumento financiero ya existe',
      );
    }

    const instrumento = this.repository.create(dto);
    return this.repository.save(instrumento);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('El instrumento financiero no existe');
    }
  }
}