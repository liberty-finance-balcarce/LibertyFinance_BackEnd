import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export enum PerfilInversorEnum {
  CONSERVADOR = 'Conservador',
  MODERADO = 'Moderado',
  AGRESIVO = 'Agresivo',
  EXPERTO = 'Experto',
}

@Entity('perfil_inversor')
export class PerfilInversor {
  @PrimaryGeneratedColumn('increment')
  id_perfil_inversor: number;

  @Column({
    name: 'nombre',
    type: 'enum',
    enum: PerfilInversorEnum,
  })
  nombre: PerfilInversorEnum;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false, type: 'date' })
  deletedAt: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.id_perfilinv)
  usuarios: Usuario[];
}
