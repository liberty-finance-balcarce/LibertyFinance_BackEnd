import {
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Usuario } from './entities/usuario.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
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

    @InjectRepository(Provincia) 
    private readonly provinciaRepository: Repository<Provincia>,

    @InjectRepository(Rol) 
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<ResponseDTO> {
    const usuarios = await this.usuarioRepository.find({
      relations: ['provincia', 'rol'],
    });
    if (!usuarios.length) throw new NotFoundException('NO existen USUARIOS');
    return {
      statusCode: HttpStatus.OK,
      message: 'Lectura de Usuarios Exitosa',
      data: usuarios,
    };
  }  

  async create(usuario: CreateUsuarioDto): Promise<ResponseDTO> {
    const existsDNI = await this.usuarioRepository.findOne({
      where: { dni_usuario: usuario.dni_usuario },
    });
    if (existsDNI) {
      throw new ConflictException('No se puede crear usuario, DNI duplicado');
    }
    const existsProvincia = await this.provinciaRepository.findOne({
      where: { id: usuario.id_provincia },
    });
    if (!existsProvincia) {
      throw new ConflictException(
        'No se puede crear usuario, provincia Inexistente',
      );
    }
    const existsRol = await this.rolRepository.findOne({
      where: { id_rol: usuario.id_rol },
    });
    if (!existsRol) {
      throw new NotFoundException(
        'No se puede crear usuario, el Rol ingresado no existe',
      );
    }

    const existsMail = await this.usuarioRepository.findOne({
      where: { mail: usuario.mail },
    });

    if (existsMail)
      throw new ConflictException('No se puede crear usuario, mail duplicado');
    const nivelHashs = 10;
    const hashContraseña = await bcrypt.hash(usuario.contraseña, nivelHashs);
    const nuevoUsuario = this.usuarioRepository.create({
      ...usuario,
      contraseña: hashContraseña,
      provincia:existsProvincia,
      rol: existsRol,
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
      throw new NotFoundException(
        `No se encontro el usuario con DNI: ${dni_usuario}`,
      );
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
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar',
      );
    
    const {id_provincia, id_rol, contraseña, dni_usuario, ...datosRestantes}= modificaciones; 

    if (dni_usuario){
          throw new ConflictException('No debe existir campo DNI en actualizacion.');
    }
    
    const datosUpdate:QueryDeepPartialEntity<Usuario> = { ...datosRestantes };

    if (contraseña){
         datosUpdate.contraseña = await bcrypt.hash(contraseña,10);
    }

    if (id_provincia){
       const existsProvincia= await this.provinciaRepository.findOne({ where: { id: id_provincia } });
       if (!existsProvincia) throw new NotFoundException('Provincia inexistente');
       datosUpdate.provincia={id:id_provincia}
    }

   if (id_rol) {
    const existsRol = await this.rolRepository.findOne({ where: { id_rol: id_rol } });
    if (!existsRol) throw new NotFoundException('Rol inexistente');
    datosUpdate.rol = { id_rol: id_rol };
  }
   const res = await this.usuarioRepository.update(dni, datosUpdate);

  if (!res.affected)
    throw new NotFoundException('No se encontró DNI con ese numero.') 

  return {
    statusCode: HttpStatus.OK,
    message: `Usuario actualizado correctamente.`,
  };
  }

  async getByNombre(nombreBuscar: string): Promise<ResponseDTO> {
    const res = await this.usuarioRepository.find({
      where: {
        nombre: Like(`%${nombreBuscar}%`),
      },
      relations: ['provincia', 'rol'],
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
        dni_usuario,
      },
      relations: ['provincia', 'rol'],
    });
    if (!res)
      throw new NotFoundException(
        `Usuario con DNI ${dni_usuario} no encontrado`,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Búsqueda por DNI exitosa',
      data: res,
    };
  }
}

