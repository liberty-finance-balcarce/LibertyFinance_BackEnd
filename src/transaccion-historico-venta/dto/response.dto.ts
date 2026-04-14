import { TransaccionHistoricoVenta } from '../entities/transaccion-historico-venta.entity';

export interface ResponseDTO {
  statusCode: number;
  message: string;
  data?: TransaccionHistoricoVenta | TransaccionHistoricoVenta[];
}
