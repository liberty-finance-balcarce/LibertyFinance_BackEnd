import { TransaccionHistoricoVenta } from '../entities/transaccion-historico-venta.entity';

export interface ResponseTransaccionHistoricoVentaDTO {
  statusCode: number;
  message: string;
  data?: TransaccionHistoricoVenta | TransaccionHistoricoVenta[];
}
