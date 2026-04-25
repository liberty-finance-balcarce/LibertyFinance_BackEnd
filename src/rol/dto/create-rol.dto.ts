import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'El rol debe ser un texto' })
  @ApiProperty({
    example: 'user',
  })
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  nombre: string;
}
