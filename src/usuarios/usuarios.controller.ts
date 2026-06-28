import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Usuario } from './entities/usuario.entity';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar usuarios',
    description:
      'Retorna una lista de todos los usuarios registrados o permite buscar por nombre parcial.',
  })
  @ApiQuery({
    name: 'nombre',
    required: false,
    description: 'Nombre o parte del nombre del usuario',
    type: String,
  })
  @ApiOkResponse({
    description: 'Lista de usuarios obtenida.',
  })
  @ApiNotFoundResponse({
    description: 'No se encontraron usuarios con ese criterio.',
  })
  async findAll(
    @Query('nombre') nombre?: string,
  ): Promise<ResponseDTO<Usuario[]>> {
    if (nombre) {
      return this.usuariosService.getByNombre(nombre);
    }
    return this.usuariosService.findAll();
  }

  @Get(':dni')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar por DNI',
    description: 'Obtiene los detalles de un usuario específico usando su DNI.',
  })
  @ApiParam({
    name: 'dni',
    description: 'DNI numérico del usuario',
    example: 12345678,
  })
  @ApiOkResponse({
    description: 'Usuario encontrado con éxito.',
  })
  @ApiNotFoundResponse({
    description: 'El DNI no corresponde a ningún usuario registrado.',
  })
  async getByDNI(
    @Param('dni', ParseIntPipe) dni: number,
  ): Promise<ResponseDTO<Usuario>> {
    return this.usuariosService.getByDNI(dni);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear usuario',
    description:
      'Registra un nuevo usuario. El DNI y el Email deben ser únicos.',
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiCreatedResponse({
    description: 'Usuario creado y contraseña hasheada correctamente.',
  })
  @ApiConflictResponse({
    description: 'Conflicto: El DNI o el Email ya existen en la base de datos.',
  })
  async create(@Body() usuarioDto: CreateUsuarioDto): Promise<ResponseDTO> {
    return this.usuariosService.create(usuarioDto);
  }

  @Patch(':dni')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar usuario',
    description:
      'Modifica los datos de un usuario existente. Si se incluye "contraseña", se actualizará el hash.',
  })
  @ApiParam({ name: 'dni', description: 'DNI del usuario a modificar' })
  @ApiOkResponse({
    description: 'Usuario actualizado correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se encontró un usuario con el DNI proporcionado.',
  })
  async update(
    @Param('dni', ParseIntPipe) dni: number,
    @Body() modificaciones: UpdateUsuarioDto,
  ): Promise<ResponseDTO> {
    return this.usuariosService.update(dni, modificaciones);
  }

  @Delete(':dni')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar usuario',
    description:
      'Elimina permanentemente un usuario de la base de datos por su DNI.',
  })
  @ApiParam({ name: 'dni', description: 'DNI del usuario a eliminar' })
  @ApiOkResponse({ description: 'Usuario eliminado satisfactoriamente.' })
  @ApiNotFoundResponse({
    description: 'No se pudo eliminar: el DNI no existe.',
  })
  async delete(@Param('dni', ParseIntPipe) dni: number): Promise<ResponseDTO> {
    return this.usuariosService.delete(dni);
  }
}
