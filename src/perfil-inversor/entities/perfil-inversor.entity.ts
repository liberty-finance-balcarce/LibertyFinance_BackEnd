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
    type: 'enum',
    enum: PerfilInversorEnum,
    unique: true,
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  nombre: PerfilInversorEnum;
  @OneToMany(() => Usuario, (usuario) => usuario.id_perfilinv)
  usuarios: Usuario[];
}
