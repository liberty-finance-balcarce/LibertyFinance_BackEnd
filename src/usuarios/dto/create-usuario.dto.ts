import { ApiProperty} from '@nestjs/swagger';
import {IsString, IsEmail, IsNumber, IsNotEmpty, Length, Min, Max} from "class-validator";


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
  @IsString({message:"Apellido debe ser un string."})
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico para notificaciones de Liberty Finance',
    example: 'carlosperez@hotmail.com',
  })
  @IsEmail({},{message:"El mail debe ser valido."})
  mail: string;

  @ApiProperty({
    description: 'Contraseña de acceso al panel (mínimo 8 caracteres)',
    example: 'pass1234',
    format: 'password',
  })
  @IsString()
  @Length(4,10)
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
  @Min(1)
  @Max(2)
  id_provincia: number; //Provincia

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
  @Min(1)
  @Max(1)
  id_rol: number;
}
