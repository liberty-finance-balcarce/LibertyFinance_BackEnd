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

@Entity('transaccion_historico_venta')
export class TransaccionHistoricoVenta {
  @PrimaryGeneratedColumn('increment')
  id_transaccion_venta: number;

  @Column({ type: 'date' })
  fecha_operacion: Date;

  @ManyToOne(() => InstrumentoFinanciero)
  @JoinColumn({
    name: 'id_instrumento',
    referencedColumnName: 'id_instrumento',
  })
  id_instrumento: InstrumentoFinanciero;

  @Column({ type: 'float', nullable: false })
  precio_instrumento: number;

  @Column({ type: 'float' })
  cantidad_paquetes: number;

  @Column({ type: 'float' })
  precio_paquete: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'dni_usuario',
    referencedColumnName: 'dni_usuario',
  })
  dni_usuario: Usuario;
}
