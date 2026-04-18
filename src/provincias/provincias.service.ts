import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}
  
  
  async findAll(): Promise<ResponseDTO> {
    const provincias = await this.provinciaRepository.find();
    if (!provincias.length)
      throw new NotFoundException('No se encontraron provincias');
    return {
      statusCode: HttpStatus.OK,
      message: 'Provincias obtenidas correctamente',
      data: provincias,
    };
  }

}
