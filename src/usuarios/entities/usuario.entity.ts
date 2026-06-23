import { PerfilInversor } from 'src/perfil-inversor/entities/perfil-inversor.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn({ unique: true })
  dni_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  mail: string;

  @Column({ select: false })
  contraseña: string;

  @Column()
  fecha_nacimiento: Date;

  @Column({ nullable: true })
  foto_perfil?: string;

  @Column()
  numero_telefono: string;

  @Column()
  direccion: string;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'date' })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    select: false,
    type: 'date',
  })
  daleted_at: Date;

  @Column({ select: false, nullable: true, type: 'int' })
  id_perfilinv?: number;

  @Column({ type: 'int' })
  id_codigo_referidos: number;

  @Column({ select: false, type: 'int' })
  id_rol: number;

  @Column({ select: false, type: 'int' })
  id_provincia: number;

  @ManyToOne(() => PerfilInversor, (perfilinv) => perfilinv.usuarios)
  @JoinColumn({ name: 'id_perfilinv' })
  perfilinv: PerfilInversor;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @ManyToOne(() => Provincia, { nullable: false })
  @JoinColumn({ name: 'id_provincia' })
  provincia: Provincia;
}
