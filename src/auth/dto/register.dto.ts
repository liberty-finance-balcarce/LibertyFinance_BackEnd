import { OmitType } from '@nestjs/swagger';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';

export class RegisterDto extends OmitType(CreateUsuarioDto, [
  'id_rol',
] as const) {}