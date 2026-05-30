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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { type Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponse } from './dto/login-response';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Recibe el DNI ("dni_usuario") y la contraseña ("contraseña") para generar un token JWT.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dni_usuario: { type: 'number', example: 26134695 },
        contraseña: { type: 'string', example: '1234' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Login exitoso. Devuelve el token (JWT).',
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales incorrectas.' })
  async login(@Body() loginDto: LoginDTO): Promise<ResponseDTO<LoginResponse>> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener informacion del usuario' })
  @ApiOkResponse({
    description: 'Informacion del usuario obtenida correctamente',
  })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request): Promise<ResponseDTO<Usuario>> {
    const dni = (req.user as any).sub;
    return this.authService.getProfile(dni);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Registra un nuevo usuario. El DNI y el Email deben ser únicos.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'Usuario creado exitosamente' })
  @ApiConflictResponse({
    description: 'Conflicto: El DNI o el Email ya existen en la base de datos.',
  })
  async register(@Body() newUser: RegisterDto): Promise<ResponseDTO> {
    return this.authService.register(newUser);
  }
}
