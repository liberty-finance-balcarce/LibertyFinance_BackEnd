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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
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
    enumName: 'Riesgo'
  })
  @ApiQuery({
    name: 'tipo_instrumento',
    required: false,
    enum: TipoInstrumento,
    enumName: 'Tipo del instrumento financiero'
  })
  @ApiOkResponse({
    description: 'Instrumentos financieros obtenidos correctamente',
  })
  @ApiNotFoundResponse({
    description: 'No se encontraron instrumentos financieros',
  })
  async findAll(
    @Query('riesgo') riesgo?: Riesgo,
    @Query('tipo_instrumento') tipo_instrumento?: TipoInstrumento,
  ): Promise<ResponseDTO> {
    const filters = {
      riesgo: riesgo,
      tipo_instrumento: tipo_instrumento,
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
  @ApiOkResponse({
    description: 'Instrumento financiero obtenido correctamente',
  })
  @ApiNotFoundResponse({
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
  @ApiOkResponse({
    description: 'Instrumento financiero eliminado correctamente',
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el instrumento financiero',
  })
  @ApiInternalServerErrorResponse({
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
  @ApiCreatedResponse({
    description: 'Instrumento financiero agregado correctamente',
  })
  @ApiBadRequestResponse({
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
  @ApiOkResponse({
    description: 'Instrumento financiero actualizado correctamente',
  })
  @ApiNotFoundResponse({
    description: 'Instrumento financiero no encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al actualizar el instrumento financiero',
  })
  @ApiBadRequestResponse({
    description: 'Debe enviar al menos un campo para actualizar',
  })
  @ApiBadRequestResponse({
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
