import { PartialType } from "@nestjs/swagger";
import { CreateInstrumentoFinancieroDto } from "./create-instrumento-financiero.dto";

export class UpdateInstrumentoFinancieroDto extends PartialType(CreateInstrumentoFinancieroDto) {}