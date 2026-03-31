import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTransaccionHistoricoVentaDto {
  @IsDateString()
  @ApiProperty({ example: '2022-01-01' })
  fecha_operacion: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  id_instrumento: number;

  @IsNumber()
  @ApiProperty({ example: 100 })
  precio_instrumento: number;

  @IsNumber()
  @ApiProperty({ example: 12345678 })
  dni_usuario: number;
}
