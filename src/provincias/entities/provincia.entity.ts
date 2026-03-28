import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provincias')
export class Provincia {
  @PrimaryGeneratedColumn('increment')
  id_provincia: number;
  @Column({ type: 'varchar', length: 50 })
  nombre: string;
}
