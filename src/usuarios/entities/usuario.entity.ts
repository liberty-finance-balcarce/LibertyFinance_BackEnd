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

  @CreateDateColumn({name: 'created_at'})
  created_at: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updated_at: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true, select: false})
  daleted_at: Date;

  @Column({ select: false, nullable: true })
  id_perfilinv?: number;
  @ManyToOne(() => PerfilInversor, (perfilinv) => perfilinv.usuarios)
  @JoinColumn({ name: 'id_perfilinv' })
  perfilinv: PerfilInversor;

  @Column()
  id_codigo_referidos: number;
  
  @Column({ select: false })
  id_rol: number;
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @Column({ select: false })
  id_provincia: number;
  @ManyToOne(() => Provincia, { nullable: false })
  @JoinColumn({ name: 'id_provincia' })
  provincia: Provincia;
}
