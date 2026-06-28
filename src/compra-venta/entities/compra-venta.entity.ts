import { Usuario } from '../../usuarios/entities/usuario.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

@Entity('compra_venta')
export class CompraVenta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    dni_usuario: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'dni_usuario' })
    usuario: Usuario;

    @Column({ unique: true })
    id_instrumento: number;

    @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
    cantidad_paquetes: number;

    @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
    cantidad_instrumento: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}