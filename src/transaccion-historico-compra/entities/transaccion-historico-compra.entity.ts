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

  @Column({ type: 'date' })
  fecha_operacion: Date;

  @CreateDateColumn({name: 'created_at'})
  created_at: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updated_at: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true, select: false})
  deleted_at: Date;

  @ManyToOne(() => InstrumentoFinanciero)
  @JoinColumn({
    name: 'id_instrumento',
    referencedColumnName: 'id_instrumento',
  })
  id_instrumento: InstrumentoFinanciero;

  @Column({ type: 'float', nullable: false })
  precio_instrumento: number;

  @Column({ type: 'float' })
  cantidad_paquete: number;

  @Column({ type: 'float' })
  precio_paquete: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'dni_usuario',
    referencedColumnName: 'dni_usuario',
  })
  dni_usuario: Usuario;
}
