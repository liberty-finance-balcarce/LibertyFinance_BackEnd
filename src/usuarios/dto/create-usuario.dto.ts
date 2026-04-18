import { ApiProperty, PartialType } from '@nestjs/swagger';
import {IsString, IsOptional, IsEmail, IsNumber, IsNotEmpty} from "class-validator";
import { Provincia } from "src/provincias/entities/provincia.entity";

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'DNI del usuario (sin puntos)',
    example: 30123456,
  })
  @IsNumber({},{message:"El DNI del usuario debe ser un numero."})
  dni_usuario: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString({message:"El nombre debe ser string."})
  @IsNotEmpty({message:"El nombre de usuario no puede estar vacio."})
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString()
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico para notificaciones de Liberty Finance',
    example: 'carlosperez@hotmail.com',
  })
  @IsEmail()
  mail: string;

  @ApiProperty({
    description: 'Contraseña de acceso al panel (mínimo 8 caracteres)',
    example: 'pass1234',
    format: 'password',
  })
  @IsString()
  contraseña: string;

  @ApiProperty({
    description: 'Número de contacto para Liberty Finance',
    example: '2266531122',
  })
  @IsString()
  numero_telefono: string;

  @ApiProperty({
    description: 'Dirección física de residencia',
    example: 'Calle 20 Nro 742',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    description: 'ID de la provincia (Relación)',
    example: 6,
  })
  @IsNumber()
  provincia: Provincia;

  @ApiProperty({
    description: 'ID del perfil de inversor (1: Conservador, 2: Moderado, 3:Agresivo)',
    example: 2,
  })
  @IsNumber()
  id_perfilinv: number;

  @ApiProperty({
    description: 'Código para el sistema de referidos',
    example: 505,
  })
  @IsNumber()
  id_codigo_referidos: number;

  @ApiProperty({
    description: 'Rol del usuario (1: invitado, 2: Usuario, 3: Administrador)',
    example: 2,
  })
  @IsNumber()
  id_rol: number;
}
