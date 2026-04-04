import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ModificarUsuarioDto, UsuarioDto } from './dto/usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  findAll(@Query('nombre') nombre?: string) {
    if (nombre) {
      return this.usuariosService.getByNombre(nombre);
    }
    return this.usuariosService.findAll();
  }

  @Get(':dni')
  getByDNI(@Param('dni') dni: number) {
    return this.usuariosService.getByDNI(dni);
  }

  @Post()
  create(@Body() nuevoUsuario: UsuarioDto) {
    return this.usuariosService.create(nuevoUsuario);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuariosService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() modificaciones: ModificarUsuarioDto,
  ) {
    return this.usuariosService.update(id, modificaciones);
  }
}
