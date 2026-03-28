import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentoFinanciero } from './entities/instrumento-financiero.entity';
import { ResponseDTO } from './dto/response.dto';
import { CreateInstrumentoFinancieroDto } from "./dto/create-instrumento-financiero.dto";
import { UpdateInstrumentoFinancieroDto } from './dto/update-instrumento-financiero.dto';

@Injectable()
export class InstrumentosFinancierosService {
  constructor(
    @InjectRepository(InstrumentoFinanciero)
    private readonly instrumentosFinancierosRepository: Repository<InstrumentoFinanciero>,
  ) { }

  async findAll(): Promise<ResponseDTO> {
    const instrumentosFinancieros = await this.instrumentosFinancierosRepository.find();
    if (!instrumentosFinancieros.length) throw new NotFoundException("No se encontraron instrumentos financieros")
    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumentos financieros obtenidos correctamente',
      data: instrumentosFinancieros,
    };
  }

  async getById(id: number): Promise<ResponseDTO> {
    const instrumentoFinanciero = await this.instrumentosFinancierosRepository.findOne({ where: { id_instrumento: id } })
    if (!instrumentoFinanciero) throw new NotFoundException("Instrumento financiero no encontrado")
    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero obtenido correctamente',
      data: instrumentoFinanciero,
    }
  }

  async create(instrumentoFinanciero: CreateInstrumentoFinancieroDto): Promise<ResponseDTO> {
    try {
      const newInstrumentoFinanciero = this.instrumentosFinancierosRepository.create(instrumentoFinanciero);
      const res = await this.instrumentosFinancierosRepository.save(newInstrumentoFinanciero);

      return {
        statusCode: HttpStatus.OK,
        message: 'Instrumento financiero agregado correctamente',
        data: res
      }
    } catch (error) {
      throw new InternalServerErrorException("Error al agregar el instrumento financiero")
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const exists = await this.instrumentosFinancierosRepository.findOne({ where: { id_instrumento: id } })
    if (!exists) throw new NotFoundException("Instrumento financiero no encontrado")
    const res = await this.instrumentosFinancierosRepository.delete(id);
    if (!res.affected) throw new InternalServerErrorException("Error al eliminar el instrumento financiero")

    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero eliminado correctamente'
    }
  }

  async update(id: number, updateData: UpdateInstrumentoFinancieroDto): Promise<ResponseDTO> {
    const instrumentoFinanciero = await this.instrumentosFinancierosRepository.findOne({ where: { id_instrumento: id } })

    if (!instrumentoFinanciero) throw new NotFoundException("Instrumento financiero no encontrado")

    const instrumentoActualizado = this.instrumentosFinancierosRepository.merge(
      instrumentoFinanciero,
      updateData
    )

    const saved = await this.instrumentosFinancierosRepository.save(instrumentoActualizado);

    return {
      statusCode: HttpStatus.OK,
      message: 'Instrumento financiero actualizado correctamente',
      data: saved
    }
  }
}