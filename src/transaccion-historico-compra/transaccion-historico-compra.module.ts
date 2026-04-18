import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransaccionHistoricoCompraController } from "./transaccion-historico-compra.controller";
import { TransaccionHistoricoCompraService } from "./transaccion-historico-compra.service";
import { TransaccionHistoricoCompra } from "./entities/transaccion-historico-compra.entity";
import { InstrumentoFinanciero } from "../instrumentos-financieros/entities/instrumento-financiero.entity";

// Importa las entidades de TypeORM 
// Permite inyectar los repos en los servicios

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransaccionHistoricoCompra,
      InstrumentoFinanciero
    ])
  ],
  controllers: [TransaccionHistoricoCompraController],
  providers: [TransaccionHistoricoCompraService],
})
export class TransaccionHistoricoCompraModule {}