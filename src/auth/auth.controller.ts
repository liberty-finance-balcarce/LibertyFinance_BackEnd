<<<<<<< HEAD
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
=======
import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiCreatedResponse, ApiConflictResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { type Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RegisterDTO } from './dto/register.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Iniciar sesión', 
    description: 'Recibe el DNI ("dni_usuario") y la contraseña ("contraseña") para generar un token JWT.' 
=======
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Recibe el DNI ("dni_usuario") y la contraseña ("contraseña") para generar un token JWT.',
>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dni_usuario: { type: 'number', example: 26134695 },
<<<<<<< HEAD
        contraseña: { type: 'string', example: '1234' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Login exitoso. Devuelve el token (JWT).' })
=======
        contraseña: { type: 'string', example: '1234' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Devuelve el token (JWT).',
  })
>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login(@Body() loginDto: LoginUsuarioDTO) {
    return await this.authService.login(loginDto);
  }
<<<<<<< HEAD
=======

  @Get('profile')
  @ApiOperation({ summary: 'Obtener informacion del usuario'})
  @ApiOkResponse({ description: 'Informacion del usuario obtenida correctamente'})
  @ApiNotFoundResponse({description:'Usuario no encontrado'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const dni = (req.user as any).sub;
    return this.authService.getProfile(dni);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario', description: 'Registra un nuevo usuario. El DNI y el Email deben ser únicos.' })
  @ApiBody({ type: RegisterDTO })
  @ApiCreatedResponse({ description: 'Usuario Creado Exitosamente!'})
  @ApiConflictResponse({ description: 'Conflicto: El DNI o el Email ya existen en la base de datos.' })
  async register(@Body() newUser: RegisterDTO): Promise<ResponseDTO<Usuario>> {
    return await this.authService.register(newUser);
  }

>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592
}
