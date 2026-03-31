import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { Riesgo } from '../entities/instrumento-financiero.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstrumentoFinancieroDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bono' })
  nombre_instrumento: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 12.5, description: 'Rendimiento esperado en porcentaje' })
  rendimiento: number;

  @IsEnum(Riesgo)
  @ApiProperty({
    enum: Riesgo,
    example: Riesgo.MEDIO,
    description: 'Nivel de riesgo del instrumento'
  })
  riesgo: Riesgo;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1000, description: 'Precio del instrumento financiero' })
  precio_instrumento: number;
}