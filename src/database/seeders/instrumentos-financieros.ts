import { DataSource } from 'typeorm';
import {
  InstrumentoFinanciero,
  Riesgo,
  TipoInstrumento,
} from 'src/instrumentos-financieros/entities/instrumento-financiero.entity';

export const InstrumentosFinancieros: Partial<InstrumentoFinanciero>[] = [
  {
    nombre_instrumento: 'Plazo Fijo',
    rendimiento: 75,
    riesgo: Riesgo.BAJO,
    precio_instrumento: 10000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
  },
  {
    nombre_instrumento: 'Bonos del Estado',
    rendimiento: 60,
    riesgo: Riesgo.BAJO,
    precio_instrumento: 5000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
  },
  {
    nombre_instrumento: 'Acciones',
    rendimiento: 120,
    riesgo: Riesgo.MEDIO,
    precio_instrumento: 15000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
  },
  {
    nombre_instrumento: 'Fondos Comunes de Inversión',
    rendimiento: 90,
    riesgo: Riesgo.MEDIO,
    precio_instrumento: 8000,
    tipo_instrumento: TipoInstrumento.TRADICIONAL,
  },
  {
    nombre_instrumento: 'Criptomonedas',
    rendimiento: 300,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 20000,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
  },
  {
    nombre_instrumento: 'NFTs',
    rendimiento: 500,
    riesgo: Riesgo.ALTO,
    precio_instrumento: 12000,
    tipo_instrumento: TipoInstrumento.NO_TRADICIONAL,
  },
];

export async function seedInstrumentosFinancieros(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(InstrumentoFinanciero);

  console.info('Seeding instrumentos financieros...');

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

  await dataSource.query('TRUNCATE TABLE instrumentos_financieros');

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

  const data = repo.create(InstrumentosFinancieros);
  await repo.save(data);

  console.info('Instrumentos financieros seed completado.');
}
