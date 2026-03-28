import { InstrumentoFinanciero } from "../entities/instrumento-financiero.entity";

export interface ResponseDTO {
    statusCode: number;
    message: string;
    data?: InstrumentoFinanciero | InstrumentoFinanciero[];
}