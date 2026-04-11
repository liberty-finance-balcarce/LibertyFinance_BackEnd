import { PerfilInversor } from "../entities/perfil-inversor.entity";

export interface ResponsePerfilInversorDTO {
    statusCode: number;
    message: string;
    data?: PerfilInversor | PerfilInversor[];
}