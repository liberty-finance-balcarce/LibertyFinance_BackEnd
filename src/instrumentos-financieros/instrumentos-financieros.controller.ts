import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InstrumentosFinancierosService } from './instrumentos-financieros.service';
import { InstrumentosFinancieros, Riesgo } from './instrumentos-financieros.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('instrumentos-financieros')
export class InstrumentosFinancierosController {
    constructor(private readonly instrumentosFinancierosService: InstrumentosFinancierosService) { }

    @Get()
    async getAll(): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosService.getAll();
    }

    @Get('name/:nombre_instrumento')
    async filterByName(@Param('nombre_instrumento') nombre_instrumento: string): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosService.filterByName(nombre_instrumento);
    }

    @Get('risk/:riesgo')
    async filterByRiesgo(@Param('riesgo') riesgo: Riesgo): Promise<InstrumentosFinancieros[]> {
        return await this.instrumentosFinancierosService.filterByRiesgo(riesgo);
    }

    @Get(':id')
    async getByID(@Param('id', ParseIntPipe) id_instrumento: number): Promise<InstrumentosFinancieros> {
        return await this.instrumentosFinancierosService.getByID(id_instrumento);
    }

    @Post()
    async create(@Body() instrumento: InstrumentosFinancieros): Promise<InstrumentosFinancieros> {
        return await this.instrumentosFinancierosService.create(instrumento);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id_instrumento: number): Promise<void> {
        return await this.instrumentosFinancierosService.delete(id_instrumento);
    }
}
