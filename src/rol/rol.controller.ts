import { Controller, Get, Param } from '@nestjs/common';
import { RolService } from './rol.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rol } from './entities/rol.entity';

@ApiTags('Rol')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  @ApiOperation({ description: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Roles obtenidos correctamente.' })
  @ApiResponse({ status: 404, description: 'No se encontraron roles.' })
  @ApiResponse({ status: 500, description: 'Error al obtener los roles' })
  async findAll(): Promise<ResponseDTO<Rol[]>> {
    return await this.rolService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Obtener un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol obtenido correctamente.' })
  @ApiResponse({ status: 404, description: 'No se encontró ningún rol' })
  @ApiResponse({ status: 500, description: 'Error al obtener el rol' })
  async getById(@Param('id') id: number): Promise<ResponseDTO<Rol>> {
    return await this.rolService.getById(id);
  }

  @Get('dni-usuario/:dni_usuario')
  @ApiOperation({ description: 'Obtener un rol por DNI de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Rol por DNI de usuario obtenido correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún rol por DNI de usuario',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener el rol por DNI de usuario',
  })
  async getByDniUsuario(
    @Param('dni_usuario') dni_usuario: number,
  ): Promise<ResponseDTO<Rol>> {
    return await this.rolService.getByDniUsuario(dni_usuario);
  }
}
