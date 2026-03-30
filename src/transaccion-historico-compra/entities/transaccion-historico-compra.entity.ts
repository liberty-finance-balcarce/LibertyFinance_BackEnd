import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InstrumentosFinancieros } from '../../instrumentos-financieros/entities/instrumentos-financieros.entity';
import { Usuarios } from './usuarios.entity';
@Entity ('transaccion_historico_compra')

export class TransaccionHistoricoCompra {
    @PrimaryGeneratedColumn('increment')
    id_transaccion_compra: number;

    @Column({ type: 'date' })
    fecha_operacion: Date;

    @ManyToOne(() => InstrumentosFinancieros)
    @JoinColumn({ 
        name: 'id_instrumento',
        referencedColumnName: 'id_instrumento'    
    })
        id_instrumento: InstrumentosFinancieros;

    @ManyToOne(()=> InstrumentosFinancieros)
    @JoinColumn({ 
        name: 'precio_instrumento',
        referencedColumnName: 'precio_instrumento'
    })
    precio_instrumento: number;

    @ManyToOne(()=> Usuarios)
    @JoinColumn({ 
        name: 'dni_usuario',
        referencedColumnName: 'dni_usuario'
    })
    dni_usuario: Usuarios;
}