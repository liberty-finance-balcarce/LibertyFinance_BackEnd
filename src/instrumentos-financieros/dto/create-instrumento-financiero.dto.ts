import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Riesgo } from '../entities/instrumento-financiero.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstrumentoFinancieroDto {
  @IsString({ message: 'El nombre del instrumento debe ser un string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @ApiProperty({ example: 'Bono' })
  @Min(3, { message: 'El nombre del instrumento debe tener al menos 3 caracteres' })
  @Max(50, { message: 'El nombre del instrumento debe tener un maximo de 50 caracteres' })
  nombre_instrumento: string;

  @IsNumber({}, { message: 'El rendimiento del instrumento debe ser un numero' })
  @Min(1, { message: 'El rendimiento del instrumento no debe ser menor a 1' })
  @IsNotEmpty({ message: 'El rendimiento del instrumento es obligatorio' })
  @ApiProperty({ example: 12.5, description: 'El rendimiento del instrumento es esperado en porcentaje' })
  rendimiento: number;

  @IsEnum(Riesgo, { message: 'El riesgo del instrumento debe ser Bajo, Medio o Alto' })
  @IsNotEmpty({ message: 'El riesgo del instrumento es requerido' })
  @ApiProperty({ 
    enum: Riesgo, 
    example: Riesgo.MEDIO,
    description: 'Nivel de riesgo del instrumento'
  })
  riesgo: Riesgo;

  @IsNumber({}, { message: 'El precio del instrumento debe ser un numero' })
  @Min(1, { message: 'El precio del instrumento no puede ser menor a 1' })
  @Max(1000000, { message: 'El precio del instrumento no puede ser mayor a 1000000' })
  @IsNotEmpty({ message: 'El precio del instrumento es requerido' })
  @ApiProperty({ example: 1000, description: 'Precio del instrumento financiero' })
  precio_instrumento: number;
}