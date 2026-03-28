import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstrumentoFinanciero } from "./entities/instrumento-financiero.entity";
import { InstrumentosFinancierosController } from "./instrumentos-financieros.controller";
import { InstrumentosFinancierosService } from "./instrumentos-financieros.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([InstrumentoFinanciero])
    ],
    controllers: [InstrumentosFinancierosController],
    providers: [InstrumentosFinancierosService],
    exports: [InstrumentosFinancierosService]
})
export class InstrumentosFinancierosModule { }
