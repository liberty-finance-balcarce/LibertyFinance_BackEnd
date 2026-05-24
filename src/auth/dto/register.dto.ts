import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  Length,
  Min,
  Max,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: 'DNI del usuario (sin puntos)',
    example: 30123456,
  })
  @IsNumber({}, { message: 'El DNI del usuario debe ser un numero' })
  dni_usuario: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString({ message: 'El nombre debe ser string' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString({ message: 'Apellido debe ser un string' })
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico para notificaciones de Liberty Finance',
    example: 'carlosperez@hotmail.com',
  })
  @IsEmail({}, { message: 'El mail debe ser valido' })
  mail: string;

  @ApiProperty({
    description: 'Contraseña de acceso al panel (mínimo 8 caracteres)',
    example: 'pass1234',
    format: 'password',
  })
  @IsString()
  @Length(4, 10)
  contraseña: string;

  @ApiProperty({
    description: 'Número de contacto para Liberty Finance',
    example: '2266531122',
  })
  @IsString({ message: 'La numero de telefono debe ser una cadena de texto' })
  numero_telefono: string;

  @ApiProperty({
    description: 'Dirección física de residencia',
    example: 'Calle 20 Nro 742',
  })
  @IsString({ message: 'La direccion debe ser una cadena de texto' })
  direccion: string;

  @ApiProperty({
    description: 'ID de la provincia (Relación)',
    example: 6,
  })
  @IsNumber({}, { message: 'El ID de la provincia debe ser un numero' })
  @Min(1, { message: 'El ID de la provincia debe mayor a 0' })
  @Max(99, { message: 'El ID de la provincia debe ser menor a 100' })
  id_provincia: number;

  @ApiProperty({
    description:
      'ID del perfil de inversor (1: Conservador, 2: Moderado, 3:Agresivo)',
    example: 2,
  })
  @IsNumber({}, { message: 'El ID de perfil de inversor debe ser un numero' })
  id_perfilinv: number;

  @ApiProperty({
    description: 'Código para el sistema de referidos',
    example: 505,
  })
  @IsNumber({}, { message: 'El ID de codigo de referidos debe ser un numero' })
  id_codigo_referidos: number;
}
