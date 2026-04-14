import { TransaccionHistoricoVenta } from '../entities/transaccion-historico-venta.entity';

export interface ResponseDT {
  statusCode: number;
  message: string;
  data?: TransaccionHistoricoVenta | TransaccionHistoricoVenta[];
}
