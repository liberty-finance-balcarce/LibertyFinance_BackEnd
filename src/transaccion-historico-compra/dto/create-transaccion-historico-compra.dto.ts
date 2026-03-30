import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTransaccionHistoricoCompraDto {

    @isDateString()
    fecha_operacion: string;

    @isNumber()
    id_instrumento: number;

    @isNumber()
    precio_instrumento: number;

    @isNumber()
    dni_usuario: number;
}