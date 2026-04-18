import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ResponseRolDTO } from './dto/response-rol.dto';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>

    ) { }

    async findAll(): Promise<ResponseRolDTO> {
        const rol = await this.rolRepository.find();
        if (!rol.length) throw new NotFoundException('No se encontraron roles.')
        return {
            statusCode: HttpStatus.OK,
            message: 'Roles obtenidos correctamente.',
            data: rol,
        }

    }

    async getById(id: number): Promise<ResponseRolDTO> {
        const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
        if (!rol) throw new NotFoundException('No se encontró ningun rol.')
        return {
            statusCode: HttpStatus.OK,
            message: 'Rol obtenido correctamente.',
            data: rol
        }

    }

    async getByDniUsuario(dni_usuario: number): Promise<ResponseRolDTO> {
        const rol = await this.rolRepository.findOne({
            where: { usuarios: { dni_usuario: dni_usuario } },
            relations: ['usuarios']
        });
        if (!rol) throw new NotFoundException('No se encontró ningun rol')
        return {
            statusCode: HttpStatus.OK,
            message: 'Rol obtenido correctamente.',
            data: rol,
        }
    }

    async create(rol: CreateRolDto): Promise<ResponseRolDTO> {
        const newRol = this.rolRepository.create({
            nombre: rol.nombre,
        });
        const res = await this.rolRepository.save(newRol);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rol creado correctamente.',
            data: res,
        }
    }

    async remove(id: number): Promise<ResponseRolDTO> {
        const exists = await this.rolRepository.findOne({
            where: { id_rol: id }
        });
        if (!exists) throw new NotFoundException('Rol no encontrado');
        const res = await this.rolRepository.delete(id);
        if (!res.affected) throw new InternalServerErrorException('Error al eliminar el rol')
        return {
            statusCode: HttpStatus.OK,
            message: 'Rol eliminado correctamente.'
        }
    }

    async update(id: number, updateData: UpdateRolDto): Promise<ResponseRolDTO> {
        const rol = await this.rolRepository.findOne({
            where: { id_rol: id }
        });
        if (!rol) throw new NotFoundException('Rol no encontrado');

        const newRol: any = { ...updateData };
        if (updateData.nombre !== undefined) {
            newRol.nombre = { nombre: updateData.nombre };

        }

        const rolActualizado = this.rolRepository.merge(
            rol, newRol
        );
        const guardarRol = await this.rolRepository.save(rolActualizado);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rol actualizado correctamente',
            data: guardarRol
        }

    }
}