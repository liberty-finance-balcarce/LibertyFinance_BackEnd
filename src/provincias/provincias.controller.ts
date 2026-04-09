import { Controller, Get} from '@nestjs/common';
import { ProvinciasService } from './provincias.service';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @Get()
  findAll() {
    return this.provinciasService.findAll();
  }

}
