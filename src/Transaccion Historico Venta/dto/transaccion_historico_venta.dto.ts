import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTransaccionHistoricoVentaDto {
    @IsDateString()
    fecha_operacion: Date;

    @IsNumber()
    id_instrumento: number;

    @IsNumber()
    precio_instrumento: number;

    @IsString()
    dni_usuario: string;
}
