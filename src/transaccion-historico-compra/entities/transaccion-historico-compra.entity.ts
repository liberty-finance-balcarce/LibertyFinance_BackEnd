import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InstrumentoFinanciero } from '../../instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from '../../usuarios/usuario.entity';

@Entity ('transaccion_historico_compra')

export class TransaccionHistoricoCompra {
    @PrimaryGeneratedColumn('increment')
    id_transaccion_compra: number;

    @Column({ type: 'date' })
    fecha_operacion: Date;

    @ManyToOne(() => InstrumentoFinanciero)
    @JoinColumn({ 
        name: 'id_instrumento',
        referencedColumnName: 'id_instrumento'    
    })
        id_instrumento: InstrumentoFinanciero;

    @ManyToOne(()=> InstrumentoFinanciero)
    @JoinColumn({ 
        name: 'precio_instrumento',
        referencedColumnName: 'precio_instrumento'
    })
    precio_instrumento: number;

    @ManyToOne(()=> Usuario)
    @JoinColumn({ 
        name: 'dni_usuario',
        referencedColumnName: 'dni_usuario'
    })
    dni_usuario: Usuario;
}