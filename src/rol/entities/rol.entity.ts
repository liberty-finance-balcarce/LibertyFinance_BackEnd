import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/usuario.entity';

export enum RolEnum {
    USUARIO_REGISTRADO = 'user',
    ADMINISTRADOR = 'admin',
}

@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn('increment')
    id_rol: number;

    @Column({
        type: 'enum',
        enum: RolEnum,
    })
    nombre: RolEnum;

    @OneToMany(() => Usuario, (usuario) => usuario.id_rol)
    usuarios: Usuario[];
}