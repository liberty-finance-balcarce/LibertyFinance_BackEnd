import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilInversor } from './entities/perfil-inversor.entity';
import { Repository } from 'typeorm';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class PerfilInversorService {
    constructor(
        @InjectRepository(PerfilInversor)
        private readonly perfilInversorRepository: Repository<PerfilInversor>
    ) { }

    async findAll(): Promise<ResponseDTO> {
        const perfilInversor = await this.perfilInversorRepository.find();
        if (!perfilInversor.length) throw new NotFoundException('No se encontraron perfiles de inversor.')
        return {
            statusCode: HttpStatus.OK,
            message: 'Perfiles de inversión obtenidos correctamente.',
            data: perfilInversor,
        }
    }

    async getById(id: number): Promise<ResponseDTO> {
        const perfilInversor = await this.perfilInversorRepository.findOne({ where: { id_perfil_inversor: id } });
        if (!perfilInversor) throw new NotFoundException('No se encontró ningun perfil de inversor.')
        return {
            statusCode: HttpStatus.OK,
            message: 'Perfil de inversor obtenido correctamente.',
            data: perfilInversor,
        }
    }

    async getByDniUsuario(dni_usuario: number): Promise<ResponseDTO> {
        const perfilInversor = await this.perfilInversorRepository.findOne({
            where: { usuarios: { dni_usuario: dni_usuario } },
            relations: ['usuarios']
        });
        if (!perfilInversor) throw new NotFoundException('No se encontró ningún perfil de inversor.')
        return {
            statusCode: HttpStatus.OK,
            message: 'Perfil de inversor obtenido correctamente.',
            data: perfilInversor,
        }
    }
}