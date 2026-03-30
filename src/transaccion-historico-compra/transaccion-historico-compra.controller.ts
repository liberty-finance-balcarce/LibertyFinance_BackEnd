import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TransaccionHistoricoCompraService } from './transaccion-historico-compra.service';
import { CreateTransaccionHistoricoCompraDto } from './dto/create-transaccion-historico-compra.dto';
import { UpdateTransaccionHistoricoCompraDTO } from './dto/update-transaccion-historico-compra.dto';
import { ResponseDTO } from './dto/response.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transaccion Historico Compra')
@Controller('transaccion-historico-Compra')
export class TransaccionHistoricoCompraController {
  constructor(
    private readonly transaccionHistoricoCompraService: TransaccionHistoricoCompraService,
  ) { }

  @Get()
  @ApiOperation({ description: "Obtener todas las transacciones historicas de compras" })
  @ApiResponse({ status: 200, description: "Transacciones historicas de Compras obtenidas correctamente." })
  @ApiResponse({ status: 404, description: "No se encontraron transacciones historicas de compras." })
  @ApiResponse({ status: 500, description: "Error al obtener las transacciones historicas de Compras." })

  async findAll(): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.findAll();
  }

  @Get('id')
  @ApiOperation({ description: "Obtener una transaccion historica de Compra por ID" })
  @ApiResponse({ status: 200, description: "Transaccion historica de Compra obtenida correctamente." })
  @ApiResponse({ status: 404, description: "No se encontró ninguna transaccion historica de Compra." })
  @ApiResponse({ status: 500, description: "Error al obtener la transaccion historica de Compra." })

  async getById(@Param('id') id: number): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.getById(id);
  }

  @Delete(':id')
  @ApiOperation({ description: "Eliminar una transaccion historica de Compra" })
  @ApiParam({ name: "id", description: "Id de la transaccion historica de Compra", required: true, type: "number" })
  @ApiResponse({ status: 200, description: "Transacción de Compra eliminada correctamente." })
  @ApiResponse({ status: 404, description: "Transacción de Compra no encontrada." })
  @ApiResponse({ status: 500, description: "Error al eliminar la transacción de Compra." })

  async remove(@Param('id') id: number): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.remove(id);
  }

  @Post()
  @ApiOperation({ description: "Crear una nueva transaccion historica de Compra." })
  @ApiBody({ type: CreateTransaccionHistoricoCompraDto })
  @ApiResponse({ status: 200, description: "Transacción historica de Compra agregada correctamente." })
  @ApiResponse({ status: 500, description: "Error al agregar la transacción historica de Compra." })

  async create(
    @Body() dto: CreateTransaccionHistoricoCompraDto,
  ): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ description: "Actualizar una transacción historica de Compra" })
  @ApiParam({ name: "id", description: "Id de la transacción historica de Compra", required: true, type: "number" })
  @ApiBody({ type: UpdateTransaccionHistoricoCompraDTO })
  @ApiResponse({ status: 200, description: "Transacción de Compra actualizada correctamente." })
  @ApiResponse({ status: 404, description: "Transacción de Compra no encontrada." })
  @ApiResponse({ status: 500, description: "Error al actualizar la transacción de Compra." })

  async update(
    @Param('id') id: number,
    @Body() TransaccionHistoricoCompra: UpdateTransaccionHistoricoCompraDTO,
  ): Promise<ResponseDTO> {
    return this.transaccionHistoricoCompraService.update(
      id,
      TransaccionHistoricoCompra,
    );
  }
}