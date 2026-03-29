import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";
import { ModificarUsuarioDto, UsuarioDto } from './dto/usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService){}

@Get()
traerUsuarios(@Query('nombre')nombre?:string){
    if (nombre) {
  return this.usuariosService.usuarioxNombre(nombre);
                }
  return this.usuariosService.getAllUsuariosDB(); 
}

@Get(':identificador')    
buscarUsuarioxID(@Param('identificador') identificador:number){
    return this.usuariosService.getUsuarioDBxID(identificador);
}

@Post()
crearNuevoUsuario(@Body() nuevoUsuario:UsuarioDto){
    return this.usuariosService.crearUsuario(nuevoUsuario);
}
@Delete(':identificador')
eliminarUsuario(@Param('identificador')identificador:number){
    return this.usuariosService.eliminarUsuario(identificador);
}

@Patch(':identificador')
modificarUsuario(@Param('identificador')identificador:number, @Body() modificaciones:ModificarUsuarioDto){
    return this.usuariosService.modificarUsuario(identificador,modificaciones);
}
}
