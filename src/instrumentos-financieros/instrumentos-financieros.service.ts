import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentoFinanciero } from './entities/instrumento-financiero.entity';
import { ResponseDTO } from './dto/response.dto';
import { CreateInstrumentoFinancieroDto } from './dto/create-instrumento-financiero.dto';
import { UpdateInstrumentoFinancieroDto } from './dto/update-instrumento-financiero.dto';

@Injectable()
export class InstrumentosFinancierosService {
  constructor(
    @InjectRepository(InstrumentoFinanciero)
    private readonly instrumentoFinancieroRepository: Repository<InstrumentoFinanciero>,
  ) {}
  async findAll(filters: any): Promise<ResponseDTO> {
    const { skip, limit, orderby, ...where } = filters;

    const DEFAULT_SKIP = 0;
    const DEFAULT_LIMIT = 10;
    const MAX_LIMIT = 100;

    let parsedSkip = DEFAULT_SKIP;
    let parsedLimit = DEFAULT_LIMIT;
    let order: any = undefined;

    if (orderby) {
      if (typeof orderby !== 'string' || !orderby.includes(':')) {
        throw new BadRequestException(
          'El parametro orderBy debe tener formato campo:ASC o campo:DESC',
        );
      }

      const [field, direction] = orderby.split(':');
      const cleanField = field?.trim();

      if (!cleanField) {
        throw new BadRequestException(
          'El parametro orderBy debe tener formato campo:ASC o campo:DESC',
        );
      }

      const metadata = this.instrumentoFinancieroRepository.metadata;
      const validColumns = metadata.columns.map((col) => col.propertyName);

      if (!validColumns.includes(cleanField)) {
        throw new BadRequestException(
          `El campo ${cleanField} no existe en InstrumentoFinanciero`,
        );
      }

      const dir = direction?.toUpperCase() || 'ASC';

      if (!['ASC', 'DESC'].includes(dir)) {
        throw new BadRequestException('El orden debe ser ASC o DESC');
      }

      order = { [cleanField]: dir };
    }

    if (skip !== undefined) {
      const value = Number(skip);

      if (isNaN(value) || !isFinite(value)) {
        throw new BadRequestException('El parametro skip debe ser un número');
      }

      if (value < 0) {
        throw new BadRequestException(
          'El parametro skip no puede ser negativo',
        );
      }

      parsedSkip = Math.floor(value);
    }

    if (limit !== undefined) {
      const value = Number(limit);

      if (isNaN(value) || !isFinite(value)) {
        throw new BadRequestException('El parAmetro limit debe ser un numero');
      }

      if (value <= 0) {
        throw new BadRequestException('El parAmetro limit debe ser mayor a 0');
      }

      if (value > MAX_LIMIT) {
        throw new BadRequestException(
          `El parametro limit no puede ser mayor a ${MAX_LIMIT}`,
        );
      }

      parsedLimit = Math.floor(value);
    }

    const instrumentosFinancieros =
      await this.instrumentoFinancieroRepository.find({
        where,
        skip: parsedSkip,
        take: parsedLimit,
        ...(order && { order }),
      });

    if (!instrumentosFinancieros.length) {
      throw new NotFoundException('No se encontraron instrumentos financieros');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumentos financieros obtenidos correctamente',
      data: instrumentosFinancieros,
    };
  }
  async getById(id: number): Promise<ResponseDTO> {
    const instrumentoFinanciero =
      await this.instrumentoFinancieroRepository.findOne({
        where: { id_instrumento: id },
      });
    if (!instrumentoFinanciero)
      throw new NotFoundException('Instrumento financiero no encontrado');
    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero obtenido correctamente',
      data: instrumentoFinanciero,
    };
  }

  async create(
    instrumentoFinanciero: CreateInstrumentoFinancieroDto,
  ): Promise<ResponseDTO> {
    const newInstrumentoFinanciero =
      this.instrumentoFinancieroRepository.create(instrumentoFinanciero);
    await this.instrumentoFinancieroRepository.save(newInstrumentoFinanciero);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Instrumento financiero agregado correctamente',
    };
  }

  async remove(id: number): Promise<ResponseDTO> {
    const exists = await this.instrumentoFinancieroRepository.findOne({
      where: { id_instrumento: id },
    });
    if (!exists)
      throw new NotFoundException('Instrumento financiero no encontrado');
    const res = await this.instrumentoFinancieroRepository.delete(id);
    if (!res.affected)
      throw new InternalServerErrorException(
        'Error al eliminar el instrumento financiero',
      );

    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero eliminado correctamente',
    };
  }

  async update(
    id: number,
    updateData: UpdateInstrumentoFinancieroDto,
  ): Promise<ResponseDTO> {
    if (!Object.keys(updateData).length)
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar',
      );
    const instrumentoFinanciero =
      await this.instrumentoFinancieroRepository.findOne({
        where: { id_instrumento: id },
      });

    if (!instrumentoFinanciero)
      throw new NotFoundException('Instrumento financiero no encontrado');

    const instrumentoActualizado = this.instrumentoFinancieroRepository.merge(
      instrumentoFinanciero,
      updateData,
    );

    await this.instrumentoFinancieroRepository.save(instrumentoActualizado);

    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero actualizado correctamente',
    };
  }
}
