import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException, BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { ResponseDTO } from './dto/response.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import bcrypt from 'bcrypt';

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
  async create(usuario: CreateUsuarioDto): Promise<ResponseDTO> {
   // try {
      const existsDNI=await this.usuarioRepository.findOne({where: {dni_usuario:usuario.dni_usuario}})
      if (existsDNI) {
                        throw new ConflictException('DNI Duplicado');
                          }
      const existsMail=await this.usuarioRepository.findOne({where: {mail:usuario.mail}})
      if (existsMail) throw new ConflictException('Mail Duplicado');      
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
    //} catch (error) {
      /*
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Campo DNI o EMAIL DUPLICADO',
          error: 'CONFLICTO',
        });
      }*/
     /*
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno al procesar el registro del usuario',
      });*/
   // }
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
    dni: number,
    modificaciones: UpdateUsuarioDto,
  ): Promise<ResponseDTO> {
    if (!Object.keys(modificaciones).length)
      throw new BadRequestException('Debe enviar al menos un campo para actualizar');
    const { contraseña } = modificaciones;
    if (contraseña) {
      const nivelHashs = 10;
      const hashContraseña = await bcrypt.hash(contraseña, nivelHashs);
      modificaciones.contraseña = hashContraseña;
    }
    const res = await this.usuarioRepository.update(dni, modificaciones);
    if (!res.affected)
      throw new NotFoundException(
        `DNI:${dni} o Usuario inexistente!!, NO SE ACTUALIZO usuario`,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: `Usuario ${dni} ACTUALIZADO!`,
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
