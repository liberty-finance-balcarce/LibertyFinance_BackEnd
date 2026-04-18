import { PartialType } from "@nestjs/swagger";
import { CreatePerfilInversorDto } from "./create-perfil-inversor.dto";

export class UpdatePerfilInversorDto extends PartialType(CreatePerfilInversorDto) { }