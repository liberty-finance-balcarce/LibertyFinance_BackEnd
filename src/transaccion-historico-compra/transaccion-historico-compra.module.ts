import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionHistoricoCompraController } from './transaccion-historico-compra.controller';
import { TransaccionHistoricoCompraService } from './transaccion-historico-compra.service';
import { TransaccionHistoricoCompra } from './entities/transaccion-historico-compra.entity';
import { InstrumentoFinanciero } from '../instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      TransaccionHistoricoCompra,
      InstrumentoFinanciero,
    ]),
  ],
  controllers: [TransaccionHistoricoCompraController],
  providers: [TransaccionHistoricoCompraService],
  exports:[TransaccionHistoricoCompraService],
})
export class TransaccionHistoricoCompraModule {}
