import { OmitType } from '@nestjs/swagger';
import { CreateTransaccionHistoricoVentaDto } from '../../transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';

export class CreateVentaDto extends OmitType(CreateTransaccionHistoricoVentaDto, ['dni_usuario'] as const) { }
