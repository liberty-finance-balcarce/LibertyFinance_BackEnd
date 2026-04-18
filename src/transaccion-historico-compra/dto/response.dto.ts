import {TransaccionHistoricoCompra} from "../entities/transaccion-historico-compra.entity";

export interface ResponseDTO {
    statusCode: number;
    message: string;
    data?: TransaccionHistoricoCompra | TransaccionHistoricoCompra[];
}