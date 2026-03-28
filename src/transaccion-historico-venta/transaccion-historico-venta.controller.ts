import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransaccionHistoricoVentaService } from './transaccion-historico-venta.service';
import { CreateTransaccionHistoricoVentaDto } from './dto/create-transaccion-historico-venta.dto';
import { TransaccionHistoricoVenta } from './entities/transaccion-historico-venta.entity';
import {
  UpdateTransaccionHistoricoVenta,
  UpdateTransaccionHistoricoVentaDTO,
} from './dto/update-transaccion-historico-venta.dto';
import { ResponseDTO } from './dto/response.dto';

@Controller('transaccion-historico-venta')
export class TransaccionHistoricoVentaController {
  constructor(
    private readonly transaccionHistoricoVentaService: TransaccionHistoricoVentaService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseDTO> {
    return await this.transaccionHistoricoVentaService.findAll();
  }

  @Get('id')
  async getById(@Param('id') id: number): Promise<ResponseDTO> {
    return await this.transaccionHistoricoVentaService.getById(id);
  }

  @Post()
  async create(
    @Body() dto: CreateTransaccionHistoricoVentaDto,
  ): Promise<ResponseDTO> {
    return await this.transaccionHistoricoVentaService.create(dto);
  }

  // TODO: HACER DELETE
  
  // TODO: HACER UPDATE
}
