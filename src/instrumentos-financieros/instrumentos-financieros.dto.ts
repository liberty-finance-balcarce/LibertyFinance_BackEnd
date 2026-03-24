import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { Riesgo } from './instrumentos-financieros.entity';

export class CreateInstrumentoFinancieroDto {
  @IsString()
  @IsNotEmpty()
  nombre_instrumento: string;

  @IsNumber()
  @Min(0)
  rendimiento: number;

  @IsEnum(Riesgo)
  riesgo: Riesgo;

  @IsNumber()
  @Min(0)
  precio_instrumento: number;
}