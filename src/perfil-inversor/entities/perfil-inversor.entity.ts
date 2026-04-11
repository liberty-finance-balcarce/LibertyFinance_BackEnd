import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export enum PerfilInversorEnum {
    CONSERVADOR = 'Conservador',
    MODERADO = 'Moderado',
    AGRESIVO = 'Agresivo',
}

@Entity('perfil_inversor')
export class PerfilInversor {
    @PrimaryGeneratedColumn('increment')
    id_perfil_inversor: number;

    @Column({
        type: 'enum',
        enum: PerfilInversorEnum,
    })
    nombre: PerfilInversorEnum
    @OneToMany(() => Usuario, (usuario) => usuario.id_perfilinv)
    usuarios: Usuario[];
}