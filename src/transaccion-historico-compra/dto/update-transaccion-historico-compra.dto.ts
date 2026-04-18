import { PartialType } from "@nestjs/swagger";
import {CreateTransaccionHistoricoCompraDto} from "./create-transaccion-historico-compra.dto";

export class UpdateTransaccionHistoricoCompraDTO extends PartialType(CreateTransaccionHistoricoCompraDto) {}