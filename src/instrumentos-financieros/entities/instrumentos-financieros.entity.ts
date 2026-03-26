import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Riesgo {
    BAJO = "Bajo",
    MEDIO = "Medio",
    ALTO = "Alto"
}

@Entity('instrumentos_financieros')
export class InstrumentosFinancieros {
    @PrimaryGeneratedColumn('increment')
    id_instrumento: number;
    @Column('varchar')
    nombre_instrumento: string;
    @Column('float')
    rendimiento: number;
    @Column({ type: 'enum', enum: Riesgo })
    riesgo: Riesgo;
    @Column('float')
    precio_instrumento: number;
}