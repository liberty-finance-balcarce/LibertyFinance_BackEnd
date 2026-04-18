import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilInversor } from "./entities/perfil-inversor.entity";
import { PerfilInversorController } from "./perfil-inversor.controller";
import { PerfilInversorService } from "./perfil-inversor.service";

@Module({
    imports: [TypeOrmModule.forFeature([PerfilInversor])],
    controllers: [PerfilInversorController],
    providers: [PerfilInversorService],
})
export class PerfilInversorModule { }