import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionHistoricoVenta } from './entities/transaccion-historico-venta.entity';
import { TransaccionHistoricoVentaService } from './transaccion-historico-venta.service';
import { TransaccionHistoricoVentaController } from './transaccion-historico-venta.controller';
import { InstrumentoFinanciero } from '../instrumentos-financieros/entities/instrumento-financiero.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionHistoricoVenta, InstrumentoFinanciero, Usuario])],
  controllers: [TransaccionHistoricoVentaController],
  providers: [TransaccionHistoricoVentaService],
})
export class TransaccionHistoricoVentaModule { }
