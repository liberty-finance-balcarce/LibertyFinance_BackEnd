import {TransaccionHistoricoCompra} from "../entities/transaccion-historico-compra.entity.ts";

export interface ResponseDTO {
    statusCode: number;
    message: string;
    data?: TransaccionHistoricoCompra | TransaccionHistoricoCompra[];
}