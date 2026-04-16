import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InstrumentosFinancierosService } from './instrumentos-financieros.service';
import { ResponseDTO } from './dto/response.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInstrumentoFinancieroDto } from './dto/create-instrumento-financiero.dto';
import { UpdateInstrumentoFinancieroDto } from './dto/update-instrumento-financiero.dto';
import {
  Riesgo,
  TipoInstrumento,
} from './entities/instrumento-financiero.entity';

@ApiTags('Instrumentos Financieros')
@Controller('instrumentos-financieros')
export class InstrumentosFinancierosController {
  constructor(
    private readonly instrumentosFinancierosService: InstrumentosFinancierosService,
  ) {}

  @Get()
  @ApiOperation({
    description: 'Obtener todos los instrumentos financieros',
  })
  @ApiQuery({
    name: 'riesgo',
    required: false,
    enum: Riesgo,
    enumName: 'Riesgo',
  })
  @ApiQuery({
    name: 'tipo_instrumento',
    required: false,
    enum: TipoInstrumento,
    enumName: 'Tipo del instrumento financiero',
  })
  @ApiQuery({
    name: 'precio_instrumento',
    required: false,
    type: 'number'
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: 'number'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Instrumentos financieros obtenidos correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron instrumentos financieros',
  })
  async findAll(
    @Query('riesgo') riesgo?: Riesgo,
    @Query('tipo_instrumento') tipo_instrumento?: TipoInstrumento,
    @Query('precio_instrumento') precio_instrumento?: number,
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
  ): Promise<ResponseDTO> {
    const filters = {
      riesgo: riesgo,
      tipo_instrumento: tipo_instrumento,
      precio_instrumento: precio_instrumento,
      skip: skip,
      limit: limit,
    };
    return await this.instrumentosFinancierosService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Obtener un instrumento financiero por Id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del instrumento financiero',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Instrumento financiero obtenido correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro el instrumento financiero',
  })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    return await this.instrumentosFinancierosService.getById(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Eliminar un instrumento financiero por Id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del instrumento financiero',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Instrumento financiero eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro el instrumento financiero',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar el instrumento financiero',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    return await this.instrumentosFinancierosService.remove(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Crear un nuevo instrumento financiero',
  })
  @ApiBody({
    type: CreateInstrumentoFinancieroDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Instrumento financiero agregado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Casos de errores: 400',
  })
  async create(
    @Body() instrumentoFinanciero: CreateInstrumentoFinancieroDto,
  ): Promise<ResponseDTO> {
    return await this.instrumentosFinancierosService.create(
      instrumentoFinanciero,
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Actualizar un instrumento financiero',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del instrumento financiero',
    required: true,
    type: 'number',
  })
  @ApiBody({
    type: UpdateInstrumentoFinancieroDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Instrumento financiero actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Instrumento financiero no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar el instrumento financiero',
  })
  @ApiResponse({
    status: 400,
    description: 'Debe enviar al menos un campo para actualizar',
  })
  @ApiResponse({
    status: 400,
    description: 'Casos de errores: 400',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() instrumentoFinanciero: UpdateInstrumentoFinancieroDto,
  ): Promise<ResponseDTO> {
    return this.instrumentosFinancierosService.update(
      id,
      instrumentoFinanciero,
    );
  }
}
