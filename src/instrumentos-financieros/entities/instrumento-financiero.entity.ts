import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Riesgo {
    BAJO = "Bajo",
    MEDIO = "Medio",
    ALTO = "Alto"
}

export enum TipoInstrumento {
    TRADICIONAL = "Tradicional",
    NO_TRADICIONAL = "No Tradicional"
}

@Entity('instrumentos_financieros')
@Check(`rendimiento >= -99 AND rendimiento <= 10000`)
@Check(`precio_instrumento >= 1 AND precio_instrumento <= 1000000`)
export class InstrumentoFinanciero {
    @PrimaryGeneratedColumn('increment')
    id_instrumento: number;
    @Column({ type: 'varchar', length: 50 })
    nombre_instrumento: string;
    @Column({ type: 'float'})
    rendimiento: number;
    @Column({ type: 'enum', enum: Riesgo })
    riesgo: Riesgo;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_instrumento: number;
    @Column({ type: 'enum', enum: TipoInstrumento })
    tipo_instrumento: TipoInstrumento;
}