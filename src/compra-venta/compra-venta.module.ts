import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraVenta } from './entities/compra-venta.entity';
import { CompraVentaService } from './compra-venta.service';
import { CompraVentaController } from './compra-venta.controller';
import { TransaccionHistoricoCompraModule } from '../transaccion-historico-compra/transaccion-historico-compra.module';
import { TransaccionHistoricoVentaModule } from '../transaccion-historico-venta/transaccion-historico-venta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompraVenta]),
    TransaccionHistoricoCompraModule,
    TransaccionHistoricoVentaModule,
  ],
  controllers: [CompraVentaController],
  providers: [CompraVentaService],
  exports: [CompraVentaService],
})
export class CompraVentaModule { }