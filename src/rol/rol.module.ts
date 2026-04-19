import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rol } from "./entities/rol.entity";
import { RolController } from "./rol.controller";
import { RolService } from "./rol.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rol])],
    controllers: [RolController],
    providers: [RolService],
})
export class RolModule { }