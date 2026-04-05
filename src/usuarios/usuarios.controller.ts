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
  ApiResponse, 
  ApiQuery, 
  ApiParam,
  ApiBody 
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
    summary: 'Obtener usuarios', 
    description: 'Retorna una lista de todos los usuarios o filtra por nombre.' 
  })
  @ApiQuery({ name: 'nombre', required: false, description: 'Filtro por nombre (búsqueda parcial)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Operación exitosa', type: ResponseDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron usuarios.' })
  async findAll(@Query('nombre') nombre?: string): Promise<ResponseDTO> {
    if (nombre) {
      return await this.usuariosService.getByNombre(nombre);
    }
    return await this.usuariosService.findAll();
  }

  @Get(':dni')
  @ApiOperation({ summary: 'Obtener por DNI', description: 'Busca un usuario por su documento nacional de identidad.' })
  @ApiParam({ name: 'dni', description: 'DNI del usuario', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuario encontrado.', type: ResponseDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Criterio de búsqueda inexistente.' })
  async getByDNI(@Param('dni', ParseIntPipe) dni: number): Promise<ResponseDTO> {
    return await this.usuariosService.getByDNI(dni);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar nuevo usuario', description: 'Crea un usuario y hashea la contraseña automáticamente.' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuario creado con éxito.', type: ResponseDTO })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'El DNI o Email ya se encuentran registrados.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor.' })
  async create(@Body() usuarioDto: CreateUsuarioDto): Promise<ResponseDTO> {
    return await this.usuariosService.create(usuarioDto);
  }

  @Patch(':dni')
  @ApiOperation({ summary: 'Actualizar datos', description: 'Permite modificar datos del usuario. Si se envía contraseña, se re-hashea.' })
  @ApiParam({ name: 'dni', description: 'DNI Ingresado por el usuario', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuario actualizado correctamente.', type: ResponseDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'El DNI proporcionado no existe.' })
  async update(
    @Param('dni', ParseIntPipe) dni: number,
    @Body() modificaciones: UpdateUsuarioDto,
  ): Promise<ResponseDTO> {
    return await this.usuariosService.update(dni, modificaciones);
  }

  @Delete(':dni')
  @ApiOperation({ summary: 'Eliminar por DNI', description: 'Elimina un usuario utilizando su DNI como identificador.' })
  @ApiParam({ name: 'dni', description: 'DNI del usuario a eliminar', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuario eliminado.', type: ResponseDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el usuario para eliminar.' })
  async delete(@Param('dni', ParseIntPipe) dni: number): Promise<ResponseDTO> {
    return await this.usuariosService.delete(dni);
  }
}
/*
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
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ModificarUsuarioDto, UsuarioDto } from './dto/usuario.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('Usuarios') // Agrupa los endpoints en la sección "usuarios" de Swagger
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
    @ApiOperation({ 
    summary: 'Listar usuarios', 
    description: 'Obtiene todos los usuarios registrados o filtra por nombre si se proporciona el parámetro.' 
  })
  @ApiQuery({ 
    name: 'nombre', 
    required: false, 
    description: 'Nombre del usuario para filtrar la búsqueda',
    example: 'Carlos'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de usuarios devuelta exitosamente.' 
  })
  findAll(@Query('nombre') nombre?: string) {
    if (nombre) {
      return this.usuariosService.getByNombre(nombre);
    }
    return this.usuariosService.findAll();
  }

  @Get(':dni')

  @ApiOperation({ summary: 'Buscar por DNI', description: 'Busca un usuario específico utilizando su documento.' })
  @ApiParam({ 
    name: 'dni', 
    description: 'Número de DNI del usuario a consultar', 
    type: Number,
    example: 12345678 
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuario encontrado.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró ningún usuario con ese DNI.' })

  getByDNI(@Param('dni') dni: number) {
    return this.usuariosService.getByDNI(dni);
  }

  @Post()

  @ApiOperation({ summary: 'Crear usuario', description: 'Registra un nuevo usuario en la plataforma.' })
  @ApiBody({ type: UsuarioDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'El usuario ha sido creado correctamente.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos.' }) 

  create(@Body() nuevoUsuario: UsuarioDto) {
    return this.usuariosService.create(nuevoUsuario);
  }
  @Delete(':dni')

  @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina permanentemente un usuario por su DNI.' })
  @ApiParam({ name: 'dni', description: 'DNI de base de datos del usuario', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DNI de usuario no encontrado.' })

  delete(@Param('dni') dni: number) {
    return this.usuariosService.delete(dni);
  }

  @Patch(':dni')

  @ApiOperation({ summary: 'Actualizar usuario', description: 'Modifica uno o varios campos de un usuario existente.' })
  @ApiParam({ name: 'dni', description: 'DNI de base de datos del usuario', type: Number })
  @ApiBody({ type: ModificarUsuarioDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Los datos del usuario han sido actualizados.' })  

  update(
    @Param('dni') dni: number,
    @Body() modificaciones: ModificarUsuarioDto,
  ) {
    return this.usuariosService.update(dni, modificaciones);
  }
}
*/