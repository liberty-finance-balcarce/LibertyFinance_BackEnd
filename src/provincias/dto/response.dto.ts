import { Provincia } from "../entities/provincia.entity";

export interface ResponseDTO {
  statusCode: number
  message: string
  data: Provincia|Provincia[] ;
}