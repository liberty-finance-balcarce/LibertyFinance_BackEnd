import { DataSource } from 'typeorm';
import {
  InstrumentoFinanciero,
  Riesgo,
  TipoInstrumento,
} from 'src/instrumentos-financieros/entities/instrumento-financiero.entity';
import { CreateInstrumentoFinancieroDto } from 'src/instrumentos-financieros/dto/create-instrumento-financiero.dto';

export const InstrumentosFinancieros: CreateInstrumentoFinancieroDto[] = [
  {
    nombre_instrumento: 'Plazo Fijo',
    rendimiento: 75,
    riesgo: Riesgo.BAJO,
    precio_instrumento: 10000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
  },
  {
    nombre_instrumento: 'Bonos del Estado',
    rendimiento: 60,
    riesgo: Riesgo.BAJO,
    precio_instrumento: 5000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
  },
  {
    nombre_instrumento: 'Acciones',
    rendimiento: 120,
    riesgo: Riesgo.MEDIO,
    precio_instrumento: 15000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
  },
  {
    nombre_instrumento: 'Fondos Comunes de Inversión',
    rendimiento: 90,
    riesgo: Riesgo.MEDIO,
    precio_instrumento: 8000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
  },
  {
    nombre_instrumento: 'Criptomonedas',
    rendimiento: 300,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 20000,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/6001/6001527.png',
  },
  {
    nombre_instrumento: 'NFTs',
    rendimiento: 500,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 12000,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2592/2592201.png',
  },
  {
    nombre_instrumento: 'Bitcoin',
    rendimiento: 300,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 62000,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2592/2592201.png',
  },  
  {
    nombre_instrumento: 'Ethereum',
    rendimiento: 100,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 1700,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2592/2592201.png',
  },  
];

export async function seedInstrumentosFinancieros(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(InstrumentoFinanciero);

  console.info('Seeding instrumentos financieros...');

  const data = repo.create(InstrumentosFinancieros);
  await repo.save(data);

  console.info('Instrumentos financieros seed completado.');
}
