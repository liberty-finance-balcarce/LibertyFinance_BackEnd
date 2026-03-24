import { BadRequestException, Injectable } from '@nestjs/common';
import { InstrumentosFinancieros, Riesgo } from './instrumentos-financieros.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstrumentosFinancierosService {

    constructor(@InjectRepository(InstrumentosFinancieros) private readonly instrumentosFinancierosRepository: Repository<InstrumentosFinancieros>) {
    }

    async getAll(): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosRepository.find();
    }

    async getByID(id_instrumento: number): Promise<InstrumentosFinancieros> {
        const exists = await this.instrumentosFinancierosRepository.findOne({ where: { id_instrumento } });
        if (!exists) {
            throw new BadRequestException('El instrumento financiero no existe');
        }
        return exists;
    }

    async filterByName(nombre_instrumento: string): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosRepository.find({ where: { nombre_instrumento: Like(`%${nombre_instrumento}%`) } });
    }

    async filterByRiesgo(riesgo: Riesgo): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosRepository.find({ where: { riesgo } });
    }

    async create(instrumento: InstrumentosFinancieros): Promise<InstrumentosFinancieros> {
        const exists = await this.instrumentosFinancierosRepository.findOne({ where: { nombre_instrumento: instrumento.nombre_instrumento } });
        if (exists) {
            throw new BadRequestException('El instrumento financiero ya existe');
        }
        return this.instrumentosFinancierosRepository.save(instrumento);
    }

    async delete(id_instrumento: number): Promise<void> {
        const exists = await this.instrumentosFinancierosRepository.findOne({ where: { id_instrumento } });
        if (!exists) {
            throw new BadRequestException('El instrumento financiero no existe');
        }
        await this.instrumentosFinancierosRepository.delete(id_instrumento);
    }
}
