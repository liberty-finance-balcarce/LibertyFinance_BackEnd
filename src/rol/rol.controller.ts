import { Controller, Get, Param } from '@nestjs/common';
import { RolService } from './rol.service';
import { ResponseDTO } from './dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    async findAll(): Promise<ResponseDTO> {
        return await this.rolService.findAll();
    }

    @Get(':id')
    @ApiOperation({ description: 'Obtener un rol por ID' })
    @ApiResponse({ status: 200, description: 'Rol obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol' })
    @ApiResponse({ status: 500, description: 'Error al obtener el rol' })

    async getById(@Param('id') id: number): Promise<ResponseDTO> {
        return await this.rolService.getById(id);
    }

    @Get('dni-usuario/:dni_usuario')
    @ApiOperation({ description: 'Obtener un rol por DNI de usuario' })
    @ApiResponse({ status: 200, description: 'Rol por DNI de usuario obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún rol por DNI de usuario' })
    @ApiResponse({ status: 500, description: 'Error al obtener el rol por DNI de usuario' })

    async getByDniUsuario(@Param('dni_usuario') dni_usuario: number): Promise<ResponseDTO> {
        return await this.rolService.getByDniUsuario(dni_usuario);
    }
<<<<<<< HEAD

    @Delete(':id')
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
=======
>>>>>>> b4135190f95d07b7e29bab34e4c34eb4bbd53738
}