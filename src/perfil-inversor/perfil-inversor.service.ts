import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilInversor } from './entities/perfil-inversor.entity';
import { Repository } from 'typeorm';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CreatePerfilInversorDto } from './dto/create-perfil-inversor.dto';
import { UpdatePerfilInversorDto } from './dto/update-perfil-inversor.dto';

@Injectable()
export class PerfilInversorService {
  constructor(
    @InjectRepository(PerfilInversor)
    private readonly perfilInversorRepository: Repository<PerfilInversor>,
  ) {}

  async findAll(): Promise<ResponseDTO<PerfilInversor[]>> {
    const perfilInversor = await this.perfilInversorRepository.find();
    if (!perfilInversor.length)
      throw new NotFoundException('No se encontraron perfiles de inversor.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfiles de inversor obtenidos correctamente.',
      data: perfilInversor,
    };
  }

  async getById(id: number): Promise<ResponseDTO<PerfilInversor>> {
    const perfilInversor = await this.perfilInversorRepository.findOne({
      where: { id_perfil_inversor: id },
    });
    if (!perfilInversor)
      throw new NotFoundException('No se encontró ningun perfil de inversor.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de inversor obtenido correctamente.',
      data: perfilInversor,
    };
  }

  async getByDniUsuario(
    dni_usuario: number,
  ): Promise<ResponseDTO<PerfilInversor>> {
    const perfilInversor = await this.perfilInversorRepository.findOne({
      where: { usuarios: { dni_usuario: dni_usuario } },
      relations: ['usuarios'],
    });
    if (!perfilInversor)
      throw new NotFoundException('No se encontró ningún perfil de inversor.');
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de inversor obtenido correctamente.',
      data: perfilInversor,
    };
  }

  async create(perfilInversor: CreatePerfilInversorDto): Promise<ResponseDTO> {
    const existingPerfilInversor = await this.perfilInversorRepository.findOne({
      where: { nombre: perfilInversor.nombre },
    });
    if (existingPerfilInversor)
      throw new BadRequestException('El perfil de inversor ya existe.');
    const newPerfilInversor =
      this.perfilInversorRepository.create(perfilInversor);
    const res = await this.perfilInversorRepository.save(newPerfilInversor);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de inversor creado correctamente.',
    };
  }

  async remove(id: number): Promise<ResponseDTO> {
    const existingPerfilInversor = await this.perfilInversorRepository.findOne({
      where: { id_perfil_inversor: id },
    });
    if (!existingPerfilInversor)
      throw new NotFoundException('El perfil de inversor no existe.');
    const deletedPerfilInversor =
      await this.perfilInversorRepository.softDelete(
        existingPerfilInversor.id_perfil_inversor,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de inversor eliminado correctamente.',
    };
  }

  async update(
    id: number,
    updatePerfilInversorDto: UpdatePerfilInversorDto,
  ): Promise<ResponseDTO> {
    const existingPerfilInversor = await this.perfilInversorRepository.findOne({
      where: { id_perfil_inversor: id },
    });
    if (!existingPerfilInversor)
      throw new NotFoundException('El perfil de inversor no existe.');

    const updatedPerfilInversor = this.perfilInversorRepository.merge(
      existingPerfilInversor,
      updatePerfilInversorDto,
    );
    const savedPerfilInversor = await this.perfilInversorRepository.save(
      updatedPerfilInversor,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de inversor actualizado correctamente.',
    };
  }
}
