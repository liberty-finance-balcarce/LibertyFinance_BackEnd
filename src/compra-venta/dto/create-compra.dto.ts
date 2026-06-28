import { OmitType } from '@nestjs/swagger';
import { CreateTransaccionHistoricoCompraDto } from '../../transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';

export class CreateCompraDto extends OmitType(CreateTransaccionHistoricoCompraDto, ['dni_usuario'] as const) { }
