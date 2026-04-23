import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Iniciar sesión', 
    description: 'Recibe el DNI ("dni_usuario") y la contraseña ("contraseña") para generar un token JWT.' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dni_usuario: { type: 'number', example: 26134695 },
        contraseña: { type: 'string', example: '1234' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Login exitoso. Devuelve el access_token.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login(@Body() loginDto: LoginUsuarioDTO) {
    return await this.authService.login(loginDto);
  }
}
