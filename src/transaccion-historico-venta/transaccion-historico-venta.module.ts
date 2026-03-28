import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionHistoricoVenta } from './entities/transaccion-historico-venta.entity';
import { TransaccionHistoricoVentaService } from './transaccion-historico-venta.service';
import { TransaccionHistoricoVentaController } from './transaccion-historico-venta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionHistoricoVenta])],
  controllers: [TransaccionHistoricoVentaController],
  providers: [TransaccionHistoricoVentaService],
})
export class TransaccionHistoricoVentaModule {}
