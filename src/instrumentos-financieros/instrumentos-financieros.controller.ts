import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InstrumentosFinancierosService } from './instrumentos-financieros.service';
import { ResponseDTO } from './dto/response.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInstrumentoFinancieroDto } from './dto/create-instrumento-financiero.dto';
import { UpdateInstrumentoFinancieroDto } from './dto/update-instrumento-financiero.dto';

@ApiTags('Instrumentos Financieros')
@Controller('instrumentos-financieros')
export class InstrumentosFinancierosController {
    constructor(private readonly instrumentosFinancierosService: InstrumentosFinancierosService) { }

    @Get()
    @ApiOperation({
        description: 'Obtener todos los instrumentos financieros'
    })
    @ApiResponse({
        status: 200,
        description: 'Instrumentos financieros obtenidos correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron instrumentos financieros'
    })
    async findAll(): Promise<ResponseDTO> {
        return await this.instrumentosFinancierosService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        description: 'Obtener un instrumento financiero por Id'
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
        description: 'No se encontro el instrumento financiero'
    })
    async getById(@Param('id') id: number): Promise<ResponseDTO> {
        return await this.instrumentosFinancierosService.getById(id);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Eliminar un instrumento financiero por Id'
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
        description: 'No se encontro el instrumento financiero'
    })
    @ApiResponse({
        status: 500,
        description: 'Error al eliminar el instrumento financiero'
    })
    async remove(@Param('id') id: number): Promise<ResponseDTO> {
        return await this.instrumentosFinancierosService.remove(id);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Crear un nuevo instrumento financiero'
    })
    @ApiBody({
        type: CreateInstrumentoFinancieroDto
    })
    @ApiResponse({
        status: 201,
        description: 'Instrumento financiero agregado correctamente'
    })
    @ApiResponse({
        status: 400,
        description: 'El precio del instrumento debe estar entre 0 y 1000000'
    })
    async create(@Body() instrumentoFinanciero: CreateInstrumentoFinancieroDto): Promise<ResponseDTO> {
        return await this.instrumentosFinancierosService.create(instrumentoFinanciero);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Actualizar un instrumento financiero'
    })
    @ApiParam({
        name: 'id',
        description: 'Id del instrumento financiero',
        required: true,
        type: 'number'
    })
    @ApiBody({
        type: UpdateInstrumentoFinancieroDto
    })
    @ApiResponse({
        status: 200,
        description: 'Instrumento financiero actualizado correctamente'
    })
    @ApiResponse({
        status: 400,
        description: 'El precio del instrumento debe estar entre 0 y 1000000'
    })
    @ApiResponse({
        status: 404,
        description: 'Instrumento financiero no encontrado'
    })
    @ApiResponse({
        status: 500,
        description: 'Error al actualizar el instrumento financiero'
    })
    async update(@Param('id') id: number, @Body() instrumentoFinanciero: UpdateInstrumentoFinancieroDto): Promise<ResponseDTO> {
        return this.instrumentosFinancierosService.update(id, instrumentoFinanciero);
    }
}
