import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstrumentoFinanciero } from '../../instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('transaccion_historico_compra')
export class TransaccionHistoricoCompra {
  @PrimaryGeneratedColumn('increment')
  id_transaccion_compra: number;

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
  deleted_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_instrumento: number;

  @Column({ type: 'int' })
  cantidad_paquetes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_paquete: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'dni_usuario',
    referencedColumnName: 'dni_usuario',
  })
  dni_usuario: Usuario;

  @ManyToOne(() => InstrumentoFinanciero)
  @JoinColumn({
    name: 'id_instrumento',
    referencedColumnName: 'id_instrumento',
  })
  id_instrumento: InstrumentoFinanciero;
}
