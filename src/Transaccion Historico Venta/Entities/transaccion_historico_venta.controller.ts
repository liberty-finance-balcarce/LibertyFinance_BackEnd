import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransaccionHistoricoVentaService } from './transaccion_historico_venta.service';
import { CreateTransaccionHistoricoVentaDto } from '../dto/transaccion_historico_venta.dto';
import { TransaccionHistoricoVenta } from './transaccion_historico_venta.entity';

@Controller('transaccion-historico-venta')
export class TransaccionHistoricoVentaController {
    constructor(
        private readonly transaccionService: TransaccionHistoricoVentaService,
    ) {}

    @Post()
    async create(@Body() dto: CreateTransaccionHistoricoVentaDto): Promise<TransaccionHistoricoVenta> {
        return await this.transaccionService.create(dto);
    }

    @Get()
    async findAll(): Promise<TransaccionHistoricoVenta[]> {
        return await this.transaccionService.findAll();
    }

    @Get('id')
    async findOne(@Param('id') id: number): Promise<TransaccionHistoricoVenta> {
        return await this.transaccionService.findOne(id);
    }
}