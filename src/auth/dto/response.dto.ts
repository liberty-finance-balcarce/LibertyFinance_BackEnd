import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    example: 200,
    description: 'Código de estado HTTP de la operación',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Login exitoso',
    description: 'Mensaje descriptivo del resultado',
  })
  message: string;

  @ApiProperty({
    example: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    description: 'Objeto con el token JWT para autenticar peticiones posteriores',
    required: false,
  })
  data: { token: string };
}

