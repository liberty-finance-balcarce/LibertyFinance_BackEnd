import { Usuario } from "../entities/usuario.entity"

export interface ResponseDTO {
    statusCode:number
    message: string
    data?: Usuario | Usuario[]
}