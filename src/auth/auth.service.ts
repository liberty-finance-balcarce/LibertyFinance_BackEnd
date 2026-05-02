import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { LoginResponseDTO } from './dto/response.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ){}

async login(loginUsuario:LoginUsuarioDTO):Promise<LoginResponseDTO> {
  const {dni_usuario,contraseña}=loginUsuario;
  const usuario = await this.usuariosService.findByDniWithPassword(dni_usuario);
  if (!usuario) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const machea = await bcrypt.compare(contraseña, usuario.contraseña);

  if (!machea) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const payload = { 
    sub: usuario.dni_usuario, 
    email: usuario.mail, 
    rol: usuario.rol.id_rol
  };
  return {
    statusCode:200,
    message: 'Login exitoso',
    token: await this.jwtService.signAsync(payload),
  };
}

}


