import { TransaccionHistoricoVenta } from "../entities/transaccion-historico-venta.entity";

export interface ResponseDTO {
    fecha_operacion: Date;
    id_instrumento: number;
    precio_instrumento: number;
    dni_usuario: string;
}
