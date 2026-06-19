import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Riesgo {
  BAJO = 'Bajo',
  MEDIO = 'Medio',
  ALTO = 'Alto',
}

export enum TipoInstrumento {
  TRADICIONAL = 'Tradicional',
  NO_TRADICIONAL = 'No Tradicional',
}

@Entity('instrumentos_financieros')
export class InstrumentoFinanciero {
  @PrimaryGeneratedColumn('increment')
  id_instrumento: number;
  @Column({ type: 'varchar', length: 50 })
  nombre_instrumento: string;
  @Column({ type: 'float' })
  rendimiento: number;
  @Column({ type: 'enum', enum: Riesgo })
  riesgo: Riesgo;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_instrumento: number;
  @Column({ type: 'enum', enum: TipoInstrumento })
  tipo_instrumento: TipoInstrumento;
  @Column({ type: 'varchar', length: 255 })
  logo_url: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    select: false
  })
  deletedAt: Date | null;
}
