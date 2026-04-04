import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InstrumentosFinancierosService } from './instrumentos-financieros.service';
import { ResponseDTO } from './dto/response.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInstrumentoFinancieroDto } from './dto/create-instrumento-financiero.dto';
import { UpdateInstrumentoFinancieroDto } from './dto/update-instrumento-financiero.dto';

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
  @ApiResponse({
    status: 200,
    description: 'Instrumentos financieros obtenidos correctamente',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: {
          type: 'string',
          example: 'Instrumentos financieros obtenidos correctamente',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id_instrumento: { type: 'number', example: 1 },
              nombre_instrumento: { type: 'string', example: 'Bonos' },
              rendimiento: { type: 'number', example: 5 },
              riesgo: { type: 'string', example: 'Medio' },
              precio_instrumento: { type: 'number', example: 1000 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron instrumentos financieros',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'No se encontraron instrumentos financieros',
        },
      },
    },
  })
  async findAll(): Promise<ResponseDTO> {
    return await this.instrumentosFinancierosService.findAll();
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: {
          type: 'string',
          example: 'Instrumento financiero obtenido correctamente',
        },
        data: {
          type: 'object',
          properties: {
            id_instrumento: { type: 'number', example: 1 },
            nombre_instrumento: { type: 'string', example: 'Bonos' },
            rendimiento: { type: 'number', example: 5 },
            riesgo: { type: 'string', example: 'Medio' },
            precio_instrumento: { type: 'number', example: 1000 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro el instrumento financiero',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No se encontro el instrumento financiero' }
      }
    }
  })
  async getById(@Param('id') id: number): Promise<ResponseDTO> {
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Instrumento financiero eliminado correctamente' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro el instrumento financiero',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No se encontro el instrumento financiero' }
      }
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar el instrumento financiero',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al eliminar el instrumento financiero' }
      }
    }
  })
  async remove(@Param('id') id: number): Promise<ResponseDTO> {
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 201 },
        message: {
          type: 'string',
          example: 'Instrumento financiero agregado correctamente',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Casos de errores: 400',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'El nombre del instrumento debe ser un string',
            'El nombre es obligatorio',
            'El rendimiento del instrumento debe ser un numero',
            'El rendimiento del instrumento no debe ser menor a 1',
            'El rendimiento del instrumento es obligatorio',
            'El rendimiento del instrumento es esperado en porcentaje',
            'El riesgo del instrumento debe ser Bajo, Medio o Alto',
            'El riesgo del instrumento es requerido',
            'El precio del instrumento debe ser un numero',
            'El precio del instrumento no puede ser menor a 1',
            'El precio del instrumento no puede ser mayor a 1000000',
            'El precio del instrumento es requerido',
          ],
        },
      },
    },
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Instrumento financiero actualizado correctamente' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Instrumento financiero no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Instrumento financiero no encontrado' }
      }
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar el instrumento financiero',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al actualizar el instrumento financiero' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Debe enviar al menos un campo para actualizar',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Debe enviar al menos un campo para actualizar' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Casos de errores: 400',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'El nombre del instrumento debe ser un string',
            'El nombre es obligatorio',
            'El rendimiento del instrumento debe ser un numero',
            'El rendimiento del instrumento no debe ser menor a 1',
            'El rendimiento del instrumento es obligatorio',
            'El rendimiento del instrumento es esperado en porcentaje',
            'El riesgo del instrumento debe ser Bajo, Medio o Alto',
            'El riesgo del instrumento es requerido',
            'El precio del instrumento debe ser un numero',
            'El precio del instrumento no puede ser menor a 1',
            'El precio del instrumento no puede ser mayor a 1000000',
            'El precio del instrumento es requerido',
          ],
        },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() instrumentoFinanciero: UpdateInstrumentoFinancieroDto,
  ): Promise<ResponseDTO> {
    return this.instrumentosFinancierosService.update(
      id,
      instrumentoFinanciero,
    );
  }
}
