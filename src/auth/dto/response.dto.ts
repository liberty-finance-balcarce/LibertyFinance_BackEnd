import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({ 
    example: 200, 
    description: 'Código de estado HTTP de la operación' 
  })
  statusCode: number;

  @ApiProperty({ 
    example: 'Login exitoso', 
    description: 'Mensaje descriptivo del resultado' 
  })
  message: string;

  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
    description: 'Token JWT para autenticar peticiones posteriores',
    required: false 
  })
  token?: string;
}