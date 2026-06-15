import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { TransaccionHistoricoCompra } from '../transaccion-historico-compra/entities/transaccion-historico-compra.entity'; // Ajustá las rutas si hace falta
import { TransaccionHistoricoVenta } from '../transaccion-historico-venta/entities/transaccion-historico-venta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransaccionHistoricoCompra,
      TransaccionHistoricoVenta
    ])
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
