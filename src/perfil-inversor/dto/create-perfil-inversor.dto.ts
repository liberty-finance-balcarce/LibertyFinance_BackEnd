import { ApiProperty } from '@nestjs/swagger';
import { PerfilInversorEnum } from '../entities/perfil-inversor.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePerfilInversorDto {
  @ApiProperty({
    enum: PerfilInversorEnum,
    example: PerfilInversorEnum.CONSERVADOR,
  })
  @IsEnum(PerfilInversorEnum, {
    message:
      'El nombre del perfil de inversor debe ser un valor válido de PerfilInversorEnum',
  })
  @IsNotEmpty({ message: 'El nombre del perfil de inversor es requerido' })
  nombre: PerfilInversorEnum;
}
