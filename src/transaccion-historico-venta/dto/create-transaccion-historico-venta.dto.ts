import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateTransaccionHistoricoVentaDto {
  @IsDateString({}, { message: 'La fecha de operación debe ser una fecha válida.' })
  @ApiProperty({ example: '2022-01-01' })
  fecha_operacion: string;

  @IsNumber({}, { message: 'El id del instrumento debe ser un número.' })
  @ApiProperty({ example: 1 })
  id_instrumento: number;

  @IsNumber({}, { message: 'El precio del instrumento debe ser un número.' })
  @ApiProperty({ example: 100 })
  precio_instrumento: number;

  @IsNumber({}, { message: 'El DNI del usuario debe ser un número.' })
  @ApiProperty({ example: 12345678 })
  dni_usuario: number;
}
