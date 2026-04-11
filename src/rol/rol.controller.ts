import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ResponseRolDTO } from './dto/response-rol.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('rol')
export class RolController {
    constructor(
        private readonly rolService: RolService,) { }

    @Get()
    @ApiOperation({ description: 'Obtener todos los roles' })
    @ApiResponse({ status: 200, description: 'Roles obtenidos correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontraron roles.' })
    @ApiResponse({ status: 500, description: 'Error al obtener los roles' })
    async findAll(): Promise<ResponseRolDTO> {
        return await this.rolService.findAll();
    }

    @Get('id')
    @ApiOperation({ description: 'Obtener un rol por ID' })
    @ApiResponse({ status: 200, description: 'Rol obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol' })
    @ApiResponse({ status: 500, description: 'Error al obtener el rol' })

    async getById(@Param('id') id: number): Promise<ResponseRolDTO> {
        return await this.rolService.getById(id);
    }

    @Get('dni-usuario')
    @ApiOperation({ description: 'Obtener un rol por DNI de usuario' })
    @ApiResponse({ status: 200, description: 'Rol por DNI de usuario obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol por DNI de usuario' })
    @ApiResponse({ status: 500, description: 'Error al obtener el rol por DNI de usuario' })

    async getByDniUsuario(@Param('dni_usuario') dni_usuario: number): Promise<ResponseRolDTO> {
        return await this.rolService.getByDniUsuario(dni_usuario);
    }

    @Delete('id')
    @ApiOperation({ description: 'Eliminar un rol' })
    @ApiResponse({ status: 200, description: 'Rol eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol' })
    @ApiResponse({ status: 500, description: 'Error al eliminar el rol' })

    async remove(@Param('id') id: number): Promise<ResponseRolDTO> {
        return await this.rolService.remove(id);
    }

    @Post()
    @ApiOperation({ description: 'Crear un rol' })
    @ApiBody({ type: CreateRolDto })
    @ApiResponse({ status: 200, description: 'Rol creado correctamente.' })
    @ApiResponse({ status: 404, description: 'No se pudo crear el rol' })
    @ApiResponse({ status: 500, description: 'Error al crear el rol' })

    async create(@Body() dto: CreateRolDto): Promise<ResponseRolDTO> {
        return await this.rolService.create(dto);
    }

    @Patch('id')
    @ApiOperation({ description: 'Actualizar un rol' })
    @ApiBody({ type: UpdateRolDto })
    @ApiResponse({ status: 200, description: 'Rol actualizado correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol' })
    @ApiResponse({ status: 500, description: 'Error al actualizar el rol' })

    async update(@Param('id') id: number, @Body() updateData: UpdateRolDto): Promise<ResponseRolDTO> {
        return await this.rolService.update(id, updateData);
    }
}