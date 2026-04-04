import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { ResponseDTO } from './dto/usuario.response.dto';
import { UsuarioDto, ModificarUsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<ResponseDTO> {
    const usuarios = await this.usuarioRepository.find({
      relations: ['provincia'],
    });
    if (!usuarios.length) throw new NotFoundException('NO existen USUARIOS');
    return {
      statusCode: HttpStatus.OK,
      message: 'Lectura de Usuarios Exitosa',
      data: usuarios,
    };
  }
  /*
  async getById(id: number): Promise<ResponseDTO> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['provincia'],
    });
    if (!usuario) throw new NotFoundException('NO existe USUARIO');

    return {
      statusCode: HttpStatus.OK,
      message: 'Lectura de Usuario Exitosa',
      data: usuario,
    };
  }
  */
  async create(usuario: UsuarioDto): Promise<ResponseDTO> {
    try {
      const nivelHashs = 10;
      const hashContraseña = await bcrypt.hash(usuario.contraseña, nivelHashs);
      const nuevoUsuario = this.usuarioRepository.create({
        ...usuario,
        contraseña: hashContraseña,
      });
      const res = await this.usuarioRepository.save(nuevoUsuario);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuario Creado Exitosamente!',
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Campo DNI o EMAIL DUPLICADO',
          error: 'CONFLICTO',
        });
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno al procesar el registro del usuario',
      });
    }
  }

  async delete(dni_usuario: number): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.delete({ dni_usuario });
    console.log(res);
    if (!res.affected)
      throw new NotFoundException('Usuario o Id no existente!');
    return {
      statusCode: HttpStatus.OK,
      message: `Usuario con DNI: ${dni_usuario} Eliminado Correctamente`,
    };
  }

  async update(
    id: number,
    modificaciones: ModificarUsuarioDto,
  ): Promise<ResponseDTO> {
    const { contraseña } = modificaciones;
    if (contraseña) {
      console.log('tiene contraseña', contraseña);
      const nivelHashs = 10;
      const hashContraseña = await bcrypt.hash(contraseña, nivelHashs);
      modificaciones.contraseña = hashContraseña;
    }
    const res = await this.usuarioRepository.update(id, modificaciones);
    if (!res.affected)
      throw new NotFoundException(
        `ID:${id} o Usuario inexistente!!, NO SE ACTUALIZO usuario`,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: `Usuario ${id} ACTUALIZADO!`,
    };
  }

  async getByNombre(nombreBuscar: string): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.find({
      where: {
        nombre: Like(`%${nombreBuscar}%`),
      },
      relations: ['provincia'],
    });
    if (!res.length)
      throw new NotFoundException('Criterio de Busqueda INEXISTENTE!');
    console.log(`Se encontraron ${res.length} registros para esta Busqueda`);
    return {
      statusCode: HttpStatus.OK,
      message: 'Busqueda Exitosa!',
      data: res,
    };
  }
  async getByDNI(dni_usuario: number): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.find({
      where: {
        dni_usuario
      },
      relations: ['provincia'],
    });
    if (!res.length)
      throw new NotFoundException('Criterio de Busqueda INEXISTENTE!');
    console.log(`Se encontraron ${res.length} registros para esta Busqueda`);
    return {
      statusCode: HttpStatus.OK,
      message: 'Busqueda Exitosa!',
      data: res,
    };
  }

}
