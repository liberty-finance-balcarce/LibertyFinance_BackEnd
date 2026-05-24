import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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
  numero_telefono: string;
  @Column()
  direccion: string;
  @Column()
  id_perfilinv: number;
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
