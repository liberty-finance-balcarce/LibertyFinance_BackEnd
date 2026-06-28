import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TransaccionHistoricoCompraService } from './transaccion-historico-compra.service';
import { CreateTransaccionHistoricoCompraDto } from './dto/create-transaccion-historico-compra.dto';
import { UpdateTransaccionHistoricoCompraDTO } from './dto/update-transaccion-historico-compra.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransaccionHistoricoCompra } from './entities/transaccion-historico-compra.entity';

@ApiTags('Transaccion Historico Compra')
@Controller('transaccion-historico-compra')
export class TransaccionHistoricoCompraController {
  constructor(
    private readonly transaccionHistoricoCompraService: TransaccionHistoricoCompraService,
  ) {}
@Get()
  @ApiOperation({
    description: 'Obtener todas las transacciones históricas de compras, opcionalmente filtradas por DNI de usuario',
  })
  @ApiQuery({
    name: 'dni_usuario',
    type: Number,
    required: false, // 💡 IMPORTANTE: Ahora es opcional
    description: 'DNI del usuario para filtrar las transacciones (opcional)',
  })
  @ApiResponse({
    status: 200,
    description: 'Transacciones obtenidas correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron transacciones.',
  })
  async findAllOrByDni(
    // 💡 Quitamos el ParseIntPipe directo porque si viene undefined fallaría. 
    // Usamos una transformación manual o lo dejamos opcional.
    @Query('dni_usuario') dni_usuario?: string,
  ): Promise<ResponseDTO<TransaccionHistoricoCompra[]>> {
    
    // Si el usuario mandó el query param ?dni_usuario=...
    if (dni_usuario !== undefined && dni_usuario !== '') {
      const dniNumber = Number(dni_usuario);
      console.log('Filtrando transacciones por DNI:', dniNumber);
      return await this.transaccionHistoricoCompraService.getByDniUsuario(dniNumber);
    }

    // Si no mandó el query param, se comporta como el findAll original
    console.log('Obteniendo absolutamente todas las transacciones');
    return await this.transaccionHistoricoCompraService.findAll();
  }



/*
  @Get()
  @ApiOperation({
    description: 'Obtener todas las transacciones historicas de compras',
  })
  @ApiResponse({
    status: 200,
    description: 'Transacciones historicas de Compras obtenidas correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron transacciones historicas de compras.',
  })
  async findAll(): Promise<ResponseDTO<TransaccionHistoricoCompra[]>> {
    return await this.transaccionHistoricoCompraService.findAll();
  }*/

  @Get(':id')
  @ApiOperation({
    description: 'Obtener una transaccion historica de Compra por ID',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la transacción' })
  @ApiResponse({
    status: 200,
    description: 'Transaccion historica de Compra obtenida correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ninguna transaccion historica de Compra555.',
  })
  async getById(
    @Param('id') id: number,
  ): Promise<ResponseDTO<TransaccionHistoricoCompra>> {
    console.log(id);
    return await this.transaccionHistoricoCompraService.getById(id);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Eliminar una transaccion historica de Compra' })
  @ApiParam({
    name: 'id',
    description: 'Id de la transaccion historica de Compra',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción de Compra eliminada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción de Compra no encontrada.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Error al eliminar la transacción de compra, intentelo mas tarde.',
  })
  async remove(@Param('id') id: number): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.remove(id);
  }

  @Post()
  @ApiOperation({
    description: 'Crear una nueva transaccion historica de Compra.',
  })
  @ApiBody({ type: CreateTransaccionHistoricoCompraDto })
  @ApiResponse({
    status: 200,
    description: 'Transacción historica de Compra agregada correctamente.',
  })
  async create(
    @Body() dto: CreateTransaccionHistoricoCompraDto,
  ): Promise<ResponseDTO> {
    return await this.transaccionHistoricoCompraService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Actualizar una transacción historica de Compra',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la transacción historica de Compra',
    required: true,
    type: 'number',
  })
  @ApiBody({ type: UpdateTransaccionHistoricoCompraDTO })
  @ApiResponse({
    status: 200,
    description: 'Transacción de Compra actualizada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción de Compra no encontrada.',
  })
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
