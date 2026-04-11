import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TransaccionHistoricoVentaService } from './transaccion-historico-venta.service';
import { CreateTransaccionHistoricoVentaDto } from './dto/create-transaccion-historico-venta.dto';
import { UpdateTransaccionHistoricoVentaDTO } from './dto/update-transaccion-historico-venta.dto';
import { ResponseTransaccionHistoricoVentaDTO } from './dto/response-transaccion-historico-venta.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transaccion Historico Venta')
@Controller('transaccion-historico-venta')
export class TransaccionHistoricoVentaController {
  constructor(
    private readonly transaccionHistoricoVentaService: TransaccionHistoricoVentaService,
  ) { }

  @Get()
  @ApiOperation({ description: "Obtener todas las transacciones historicas de ventas" })
  @ApiResponse({ status: 200, description: "Transacciones historicas de ventas obtenidas correctamente." })
  @ApiResponse({ status: 404, description: "No se encontraron transacciones historicas de ventas." })
  @ApiResponse({ status: 500, description: "Error al obtener las transacciones historicas de ventas." })

  async findAll(): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return await this.transaccionHistoricoVentaService.findAll();
  }

  @Get('id')
  @ApiOperation({ description: "Obtener una transaccion historica de venta por ID" })
  @ApiResponse({ status: 200, description: "Transaccion historica de venta obtenida correctamente." })
  @ApiResponse({ status: 404, description: "No se encontró ninguna transaccion historica de venta." })
  @ApiResponse({ status: 500, description: "Error al obtener la transaccion historica de venta." })

  async getById(@Param('id') id: number): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return await this.transaccionHistoricoVentaService.getById(id);
  }

  @Get('dni-usuario')
  @ApiOperation({ description: "Obtener una transaccion historica de venta por DNI de usuario" })
  @ApiResponse({ status: 200, description: "Transaccion historica de venta obtenida correctamente." })
  @ApiResponse({ status: 404, description: "No se encontró ninguna transaccion historica de venta." })
  @ApiResponse({ status: 500, description: "Error al obtener la transaccion historica de venta." })

  async getByDniUsuario(@Param('dni_usuario') dni_usuario: number): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return await this.transaccionHistoricoVentaService.getByDniUsuario(dni_usuario);
  }

  @Delete(':id')
  @ApiOperation({ description: "Eliminar una transaccion historica de venta" })
  @ApiParam({ name: "id", description: "Id de la transaccion historica de venta", required: true, type: "number" })
  @ApiResponse({ status: 200, description: "Transacción de venta eliminada correctamente." })
  @ApiResponse({ status: 404, description: "Transacción de venta no encontrada." })
  @ApiResponse({ status: 500, description: "Error al eliminar la transacción de venta." })

  async remove(@Param('id') id: number): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return await this.transaccionHistoricoVentaService.remove(id);
  }

  @Post()
  @ApiOperation({ description: "Crear una nueva transaccion historica de venta." })
  @ApiBody({ type: CreateTransaccionHistoricoVentaDto })
  @ApiResponse({ status: 200, description: "Transacción historica de venta agregada correctamente." })
  @ApiResponse({ status: 500, description: "Error al agregar la transacción historica de venta." })

  async create(
    @Body() dto: CreateTransaccionHistoricoVentaDto,
  ): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return await this.transaccionHistoricoVentaService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ description: "Actualizar una transacción historica de venta" })
  @ApiParam({ name: "id", description: "Id de la transacción historica de venta", required: true, type: "number" })
  @ApiBody({ type: UpdateTransaccionHistoricoVentaDTO })
  @ApiResponse({ status: 200, description: "Transacción de venta actualizada correctamente." })
  @ApiResponse({ status: 404, description: "Transacción de venta no encontrada." })
  @ApiResponse({ status: 500, description: "Error al actualizar la transacción de venta." })

  async update(
    @Param('id') id: number,
    @Body() TransaccionHistoricoVenta: UpdateTransaccionHistoricoVentaDTO,
  ): Promise<ResponseTransaccionHistoricoVentaDTO> {
    return this.transaccionHistoricoVentaService.update(
      id,
      TransaccionHistoricoVenta,
    );
  }
}
