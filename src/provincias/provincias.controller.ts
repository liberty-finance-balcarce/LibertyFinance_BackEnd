import { Controller, Get } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Provincia } from './entities/provincia.entity';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @Get()
  findAll(): Promise<ResponseDTO<Provincia[]>> {
    return this.provinciasService.findAll();
  }
}
