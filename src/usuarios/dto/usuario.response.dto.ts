import { Usuario } from "../usuario.entity"

export interface ResponseDTO {
    code:number
    message: string
    data?: Usuario | Usuario[]
}