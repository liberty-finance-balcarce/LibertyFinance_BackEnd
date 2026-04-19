import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth,
  ApiResponse, 
  ApiQuery, 
  ApiParam,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ResponseDTO } from './dto/response.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar usuarios', 
    description: 'Retorna una lista de todos los usuarios registrados o permite buscar por nombre parcial.' 
  })
  @ApiQuery({ name: 'nombre', required: false, description: 'Nombre o parte del nombre del usuario', type: String })
  @ApiOkResponse({ description: 'Lista de usuarios obtenida.', type: ResponseDTO })
  @ApiNotFoundResponse({ description: 'No se encontraron usuarios con ese criterio.' })
  async findAll(@Query('nombre') nombre?: string): Promise<ResponseDTO> {
    if (nombre) {
      return await this.usuariosService.getByNombre(nombre);
    }
    return await this.usuariosService.findAll();
  }

  @Get(':dni')
  @ApiOperation({ summary: 'Buscar por DNI', description: 'Obtiene los detalles de un usuario específico usando su DNI.' })
  @ApiParam({ name: 'dni', description: 'DNI numérico del usuario', example: 12345678 })
  @ApiOkResponse({ description: 'Usuario encontrado con éxito.', type: ResponseDTO })
  @ApiNotFoundResponse({ description: 'El DNI no corresponde a ningún usuario registrado.' })
  async getByDNI(@Param('dni', ParseIntPipe) dni: number): Promise<ResponseDTO> {
    return await this.usuariosService.getByDNI(dni);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear usuario', description: 'Registra un nuevo usuario. El DNI y el Email deben ser únicos.' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiCreatedResponse({ description: 'Usuario creado y contraseña hasheada correctamente.', type: ResponseDTO })
  @ApiConflictResponse({ description: 'Conflicto: El DNI o el Email ya existen en la base de datos.' })
  async create(@Body() usuarioDto: CreateUsuarioDto): Promise<ResponseDTO> {
    return await this.usuariosService.create(usuarioDto);
  }

  @Patch(':dni')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario', description: 'Modifica los datos de un usuario existente. Si se incluye "contraseña", se actualizará el hash.' })
  @ApiParam({ name: 'dni', description: 'DNI del usuario a modificar' })
  @ApiOkResponse({ description: 'Usuario actualizado correctamente.', type: ResponseDTO })
  @ApiNotFoundResponse({ description: 'No se encontró un usuario con el DNI proporcionado.' })
  async update(
    @Param('dni', ParseIntPipe) dni: number,
    @Body() modificaciones: UpdateUsuarioDto,
  ): Promise<ResponseDTO> {
    return await this.usuariosService.update(dni, modificaciones);
  }

  @Delete(':dni')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina permanentemente un usuario de la base de datos por su DNI.' })
  @ApiParam({ name: 'dni', description: 'DNI del usuario a eliminar' })
  @ApiOkResponse({ description: 'Usuario eliminado satisfactoriamente.' })
  @ApiNotFoundResponse({ description: 'No se pudo eliminar: el DNI no existe.' })
  async delete(@Param('dni', ParseIntPipe) dni: number): Promise<ResponseDTO> {
    return await this.usuariosService.delete(dni);
  }
}
