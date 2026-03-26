import { InstrumentosFinancieros } from "../entities/instrumentos-financieros.entity";

export interface ResponseDTO {
    statusCode: number;
    message: string;
    data?: InstrumentosFinancieros | InstrumentosFinancieros[];
}