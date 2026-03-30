import { IsDateString, IsNumber } from 'class-validator';

export class CreateTransaccionHistoricoCompraDto {

    @IsDateString()
    fecha_operacion: string;

    @IsNumber()
    id_instrumento: number;

    @IsNumber()
    precio_instrumento: number;

    @IsNumber()
    dni_usuario: number;
}