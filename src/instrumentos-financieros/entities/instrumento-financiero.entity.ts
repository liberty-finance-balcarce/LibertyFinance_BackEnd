import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Riesgo {
    BAJO = "Bajo",
    MEDIO = "Medio",
    ALTO = "Alto"
}

@Entity('instrumentos_financieros')
export class InstrumentoFinanciero {
    @PrimaryGeneratedColumn('increment')
    id_instrumento: number;
    @Column({ type: 'varchar', length: 50 })
    nombre_instrumento: string;
    @Column({ type: 'float', precision: 10, scale: 2 })
    rendimiento: number;
    @Column({ type: 'enum', enum: Riesgo })
    riesgo: Riesgo;
    @Column({ type: 'float', precision: 10, scale: 2 })
    precio_instrumento: number;
}