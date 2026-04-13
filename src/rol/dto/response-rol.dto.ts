import { Rol } from "../entities/rol.entity";

export interface ResponseRolDTO {
    statusCode: number;
    message: string;
    data?: Rol | Rol[];
}

