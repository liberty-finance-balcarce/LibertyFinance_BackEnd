import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstrumentosFinancieros } from "./entities/instrumentos-financieros.entity";
import { InstrumentosFinancierosController } from "./instrumentos-financieros.controller";
import { InstrumentosFinancierosService } from "./instrumentos-financieros.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([InstrumentosFinancieros])
    ],
    controllers: [InstrumentosFinancierosController],
    providers: [InstrumentosFinancierosService],
    exports: [InstrumentosFinancierosService]
})
export class InstrumentosFinancierosModule { }
