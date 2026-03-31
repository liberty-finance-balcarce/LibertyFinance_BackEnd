import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InstrumentoFinanciero } from "../../instrumentos-financieros/entities/instrumento-financiero.entity"
import { Usuario } from '../../usuarios/usuario.entity';

@Entity('transaccion_historico_venta')

export class TransaccionHistoricoVenta {
    @PrimaryGeneratedColumn('increment')
    id_transaccion_venta: number;

    @Column({ type: 'date' })
    fecha_operacion: Date;

    @ManyToOne(() => InstrumentoFinanciero)
    @JoinColumn({
        name: 'id_instrumento',
        referencedColumnName: 'id_instrumento'
    })
    id_instrumento: InstrumentoFinanciero;

    @Column({ type: 'float', nullable: false })
    precio_instrumento: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({
        name: 'dni_usuario',
        referencedColumnName: 'dni_usuario'
    })
    dni_usuario: Usuario;
}