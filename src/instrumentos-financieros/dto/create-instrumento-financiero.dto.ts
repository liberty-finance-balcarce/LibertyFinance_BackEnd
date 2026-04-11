import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  Min,
  Max,
  Length,
  IsDefined,
} from 'class-validator';
import {
  Riesgo,
  TipoInstrumento,
} from '../entities/instrumento-financiero.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstrumentoFinancieroDto {
  @IsString({ message: 'El nombre del instrumento debe ser un string' })
  @IsNotEmpty({ message: 'El nombre del instrumento es obligatorio' })
  @ApiProperty({ example: 'Bono',
    minLength: 3,
    maxLength: 50,
    description: 'Nombre del instrumento financiero'
   })
  @Length(3, 50, {
    message: 'El nombre del instrumento debe tener entre 3 y 50 caracteres'
  })
  nombre_instrumento: string;

  @IsNumber(
    {},
    { message: 'El rendimiento del instrumento debe ser un numero' },
  )
  @Min(-99, {
    message: 'El rendimiento del instrumento no debe ser menor a -99',
  })
  @Max(10000, {
    message: 'El rendimiento del instrumento no debe ser mayor a 10000',
  })
  @IsDefined({ message: 'El rendimiento del instrumento es obligatorio' })
  @ApiProperty({
    example: 12.5,
    type: 'number',
    format: 'float',
    description: 'Rendimiento del instrumento en porcentaje',
    minimum: -99,
    maximum: 10000
  })
  rendimiento: number;

  @IsEnum(Riesgo)
  @ApiProperty({ 
    enum: Riesgo, 
    example: Riesgo.MEDIO,
    description: 'Nivel de riesgo del instrumento',
  })
  riesgo: Riesgo;

  @IsNumber({}, { message: 'El precio del instrumento debe ser un numero' })
  @Min(1, { message: 'El precio del instrumento no puede ser menor a 1' })
  @Max(1000000, {
    message: 'El precio del instrumento no puede ser mayor a 1000000',
  })
  @IsDefined({ message: 'El precio del instrumento es requerido' })
  @ApiProperty({
    example: 1000,
    description: 'Precio del instrumento financiero',
  })
  precio_instrumento: number;

  @IsEnum(TipoInstrumento, {
    message: 'El tipo del instrumento debe ser Tradicional o No Tradicional',
  })
  @IsNotEmpty({ message: 'El tipo del instrumento es requerido' })
  @ApiProperty({
    enum: TipoInstrumento,
    example: TipoInstrumento.TRADICIONAL,
    description: 'Tipo del instrumento',
  })
  tipo_instrumento: TipoInstrumento;
}
