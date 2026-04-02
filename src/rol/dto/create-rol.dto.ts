import { ApiProperty } from "@nestjs/swagger";
import { RolEnum } from "../entities/rol.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateRolDto {
    @ApiProperty({
        enum: RolEnum,
        example: RolEnum.USUARIO_REGISTRADO,
    })

    @IsEnum(RolEnum)
    @IsNotEmpty()
    nombre: RolEnum;
}