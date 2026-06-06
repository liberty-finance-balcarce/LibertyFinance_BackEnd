import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<ResponseDTO<Rol[]>> {
    const rol = await this.rolRepository.find();
    if (!rol.length) throw new NotFoundException('No se encontraron roles.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Roles obtenidos correctamente.',
      data: rol,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Rol>> {
    const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
    if (!rol) throw new NotFoundException('No se encontró ningun rol.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Rol obtenido correctamente.',
      data: rol,
    };
  }

  async getByDniUsuario(dni_usuario: number): Promise<ResponseDTO<Rol>> {
    const rol = await this.rolRepository.findOne({
      where: { usuarios: { dni_usuario: dni_usuario } },
      relations: ['usuarios'],
    });
    if (!rol) throw new NotFoundException('No se encontró ningun rol');
    return {
      statusCode: HttpStatus.OK,
      message: 'Rol obtenido correctamente.',
      data: rol,
    };
  }
}
