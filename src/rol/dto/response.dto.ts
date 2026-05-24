import { Rol } from '../entities/rol.entity';

export interface ResponseDTO {
  statusCode: number;
  message: string;
  data?: Rol | Rol[];
}
