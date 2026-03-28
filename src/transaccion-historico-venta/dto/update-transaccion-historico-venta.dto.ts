import { PartialType } from "@nestjs/swagger";
import { CreateTransaccionHistoricoVentaDto } from "./create-transaccion-historico-venta.dto";

export class UpdateTransaccionHistoricoVentaDTO extends PartialType(CreateTransaccionHistoricoVentaDto) { }