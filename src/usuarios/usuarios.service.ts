import {
  HttpStatus,   //relation
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
      relations: ['provincia','rol'],
    });
    if (!usuarios.length) throw new NotFoundException('NO existen USUARIOS');
    return {
      statusCode: HttpStatus.OK,
      message: 'Lectura de Usuarios Exitosa',
      data: usuarios,
    };
  }

  async create(usuario: CreateUsuarioDto): Promise<ResponseDTO> {
   // try {
      const existsDNI=await this.usuarioRepository.findOne({where: {dni_usuario:usuario.dni_usuario}})
      if (existsDNI) {
                        throw new ConflictException('No se puede crear usuario, DNI duplicado');
                          }
      const existsMail=await this.usuarioRepository.findOne({where: {mail:usuario.mail}})
      if (existsMail) throw new ConflictException('No se puede crear usuario, mail duplicado');      
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
  }

  async delete(dni_usuario: number): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.delete({ dni_usuario });
    if (!res.affected)
      throw new NotFoundException(`No se encontro el usuario con DNI: ${dni_usuario}`);
    return {
      statusCode: HttpStatus.OK,
      message: `El usuario fue eliminado correctamente`,
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
        `No se encontro DNI con ese numero.`,
      );
    return {
      statusCode: HttpStatus.OK,
      message: `Usuario actualizado correctamente.`,  //caso para estandar
    };
  }

  async getByNombre(nombreBuscar: string): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.find({
      where: {
        nombre: Like(`%${nombreBuscar}%`),
      },
      relations: ['provincia','rol'],
    });
    if (!res.length)
      throw new NotFoundException('No se encontro usuario/s con ese nombre.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario/s obtenido/s correctamente.',
      data: res,
    };
  }
  async getByDNI(dni_usuario: number): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.findOne({
      where: {
        dni_usuario
      },
      relations: ['provincia','rol'],
    });
    if (!res)
      throw new NotFoundException(`Usuario con DNI ${dni_usuario} no encontrado`);
    return {
      statusCode: HttpStatus.OK,
      message: 'Búsqueda por DNI exitosa',
      data: res,
    };
  }

}
