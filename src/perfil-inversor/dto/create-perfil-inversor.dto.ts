import { ApiProperty } from "@nestjs/swagger";
import { PerfilInversorEnum } from "../entities/perfil-inversor.entity";
import { IsEnum } from "class-validator";

export class CreatePerfilInversorDto {
    @ApiProperty({
        enum: PerfilInversorEnum,
        example: PerfilInversorEnum.CONSERVADOR,
    })

    @IsEnum(PerfilInversorEnum)
    nombre: PerfilInversorEnum;
}