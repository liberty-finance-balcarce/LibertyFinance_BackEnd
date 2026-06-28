import { Module } from '@nestjs/common';
import { CompraVentaController } from './compra-venta.controller';
import { CompraVentaService } from './compra-venta.service';
import { TransaccionHistoricoCompraModule } from '../transaccion-historico-compra/transaccion-historico-compra.module';
import { TransaccionHistoricoVentaModule } from '../transaccion-historico-venta/transaccion-historico-venta.module';

@Module({
  imports: [
    TransaccionHistoricoCompraModule,
    TransaccionHistoricoVentaModule,
  ],
  controllers: [CompraVentaController],
  providers: [CompraVentaService],
})
export class CompraVentaModule {}
