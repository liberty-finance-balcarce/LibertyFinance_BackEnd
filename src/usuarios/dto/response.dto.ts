import { Usuario } from "../entities/usuario.entity"

export class ResponseDTO {
    statusCode!:number
    message!: string
    data?: Usuario | Usuario[]
}
