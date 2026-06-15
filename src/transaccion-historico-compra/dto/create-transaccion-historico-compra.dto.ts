import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateTransaccionHistoricoCompraDto {
  @IsDateString(
    {},
    { message: 'La fecha de operación debe ser una fecha válida' },
  )
  @ApiProperty({
    example: '2022-01-01',
    description: 'Fecha de la operación',
    type: 'string',
    format: 'date',
  })
  fecha_operacion: string;

  @IsNumber({}, { message: 'El id del instrumento debe ser un número' })
  @ApiProperty({
    example: 1,
    description: 'Id del instrumento',
    type: 'number',
    minimum: 1,
    maximum: 1000000,
  })
  id_instrumento: number;

  @IsNumber({}, { message: 'El precio del instrumento debe ser un número' })
  @ApiProperty({
    example: 100,
    description: 'Precio del instrumento',
    type: 'number',
    minimum: 0,
    maximum: 1000000000,
  })
  precio_instrumento: number;

  @IsNumber({}, { message: 'La cantidad de paquetes debe ser un número' })
  @ApiProperty({
    example: 1,
    description: 'Cantidad de paquetes',
    type: 'number',
    minimum: 0,
    maximum: 10,
  })
  cantidad_paquetes: number;

  @IsNumber({}, { message: 'El precio del paquete debe ser un número' })
  @ApiProperty({
    example: 100,
    description: 'Precio del paquete',
    type: 'number',
    minimum: 0,
    maximum: 1000000000,
  })
  precio_paquete: number;

  @IsNumber({}, { message: 'El DNI del usuario debe ser un número' })
  @ApiProperty({
    example: 12345678,
    description: 'DNI del usuario',
    type: 'number',
    minimum: 10000000,
    maximum: 999999999,
  })
  dni_usuario: number;
}
