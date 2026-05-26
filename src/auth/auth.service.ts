import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async login(loginUsuario: LoginDTO): Promise<ResponseDTO<LoginResponse>> {
    const { dni_usuario, contraseña } = loginUsuario;
    const usuario = await this.usuarioRepository.findOne({
      where: { dni_usuario },
      select: ['dni_usuario', 'contraseña', 'mail', 'id_rol'],
    });
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
      rol: usuario.id_rol,
    };
    return {
      statusCode: 200,
      message: 'Login exitoso',
      data: { token: await this.jwtService.signAsync(payload) },
    };
  }

  async getProfile(dni: number): Promise<ResponseDTO<Usuario>> {
    const user = await this.usuarioRepository.findOne({
      where: { dni_usuario: dni },
      relations: { rol: true, provincia: true },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return {
      statusCode: HttpStatus.OK,
      message: 'Informacion del usuario obtenida correctamente',
      data: user,
    };
  }

  async register(usuario: RegisterDto): Promise<ResponseDTO> {
    const rol: number = 1;
    const newUsuario: CreateUsuarioDto = { ...usuario, id_rol: rol };
    await this.usuariosService.create(newUsuario);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario creado exitosamente',
    };
  }
}
