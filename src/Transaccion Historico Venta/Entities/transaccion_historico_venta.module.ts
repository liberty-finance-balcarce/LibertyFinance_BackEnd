import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransaccionHistoricoVenta } from "./transaccion_historico_venta.entity";
import { TransaccionHistoricoVentaService } from "./transaccion_historico_venta.service";
import { TransaccionHistoricoVentaController } from "./transaccion_historico_venta.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TransaccionHistoricoVenta])],
    controllers: [TransaccionHistoricoVentaController],
    providers: [TransaccionHistoricoVentaService],
})

export class TransaccionHistoricoVentaModule{}