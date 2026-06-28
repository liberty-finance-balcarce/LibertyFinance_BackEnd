import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

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
    example: 61000,
    description: 'Precio del instrumento',
    type: 'number',
    minimum: 0,
    maximum: 1000000,
  })
  precio_instrumento: number;

  @IsNumber({}, { message: 'La cantidad de paquetes debe ser un número' })
  @ApiProperty({
    example: 1,
    description: 'Cantidad de paquetes',
    type: 'number',
    minimum: 1,
    maximum: 30,
  })
  cantidad_paquetes: number;


  @IsDateString(
    {},
    { message: 'La fecha de actualizacion debe ser una fecha válida' },
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Fecha de actualización',
    type: 'string',
    format: 'date',
  })  
  @IsOptional()
  updated_at?: Date;

  @IsDateString(
    {},
    { message: 'La fecha de borrado debe ser una fecha válida' },
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Fecha de borrado',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  deleted_at?: Date;
  
  @IsNumber({}, { message: 'El precio del paquete debe ser un número' })
  @ApiProperty({
    example: 100,
    description: 'Precio del paquete',
    type: 'number',
    minimum: 50,
    maximum: 1000,
  })
  precio_paquete: number;

  @IsNumber({}, { message: 'El DNI del usuario debe ser un número' })
  @ApiProperty({
    example: 26134695,
    description: 'DNI del usuario',
    type: 'number',
    minimum: 3000000,
    maximum: 80000000,
  })
  dni_usuario: number;

  @IsNumber({}, { message: 'La cantidad de instrumento comprado debe ser un número' })
  @ApiProperty({
    example: 0.00018,
    description: 'Cantidad del instrumento',
    type: 'number',
    minimum: 0.000001,
    maximum: 1000000000,
  })
  @IsNotEmpty({message:'cantidad instrumento comprado no puede estar vacio'})
  cantidad_instrumento_comprado: number;

}
