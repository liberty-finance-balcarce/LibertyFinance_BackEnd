import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponsePerfilInversorDTO } from './dto/response-perfil-inversor.dto';
import { PerfilInversorService } from './perfil-inversor.service';

@ApiTags('Perfil Inversor')
@Controller('perfil_inversor')
export class PerfilInversorController {
    constructor(
        private readonly perfilInversorService: PerfilInversorService,) { }

    @Get()
    @ApiOperation({ description: 'Obtener todos los perfiles de inversor' })
    @ApiResponse({ status: 200, description: 'Perfiles de inversor obtenidos correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontraron perfiles de inversor.' })
    @ApiResponse({ status: 500, description: 'Error al obtener los perfiles de inversor.' })
    async findAll(): Promise<ResponsePerfilInversorDTO> {
        return await this.perfilInversorService.findAll();
    }

    @Get('id')
    @ApiOperation({ description: 'Obtener un perfil de inversor por ID' })
    @ApiResponse({ status: 200, description: 'Perfil de inversor obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún perfil de inversor.' })
    @ApiResponse({ status: 500, description: 'Error al obtener el perfil de inversor.' })
    async getById(@Param('id') id: number): Promise<ResponsePerfilInversorDTO> {
        return await this.perfilInversorService.getById(id);
    }

    @Get('dni-usuario')
    @ApiOperation({ description: 'Obtener un perfil de inversor por DNI de usuario' })
    @ApiResponse({ status: 200, description: 'Perfil de inversor por DNI de usuario obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún perfil de inversor por DNI de usuario.' })
    @ApiResponse({ status: 500, description: 'Error al obtener el perfil de inversor por DNI de usuario.' })
    async getByDniUsuario(@Param('dni_usuario') dni_usuario: number): Promise<ResponsePerfilInversorDTO> {
        return await this.perfilInversorService.getByDniUsuario(dni_usuario);
    }
}
