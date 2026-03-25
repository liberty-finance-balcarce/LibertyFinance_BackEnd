import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InstrumentosFinancieros } from './instrumentos_financieros.entity';
import { Usuarios } from './usuarios.entity';

/*
    id_transaccion_venta PK autoincrement
	id_instrumento FK reference instrumento financiero
    precio_instrumento FK reference instrumento financiero
	fecha_operacion DATE
	dni_usuario FK reference usuario
*/

@Entity ('transaccion_historico_venta')

export class TransaccionHistoricoVenta {
    @PrimaryGeneratedColumn('increment')
    id_transaccion_venta: number;

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