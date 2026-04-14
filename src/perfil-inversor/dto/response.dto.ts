import { PerfilInversor } from "../entities/perfil-inversor.entity";

export interface ResponseDTO {
    statusCode: number;
    message: string;
    data?: PerfilInversor | PerfilInversor[];
}