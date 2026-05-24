import { DataSource } from 'typeorm';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import chalk from 'chalk';

export const Provincias: Provincia[] = [
  {
    id: 2,
    provincia: 'CABA',
  },
  {
    id: 6,
    provincia: 'Buenos Aires',
  },
  {
    id: 10,
    provincia: 'Catamarca',
  },
  {
    id: 14,
    provincia: 'Córdoba',
  },
  {
    id: 18,
    provincia: 'Corrientes',
  },
  {
    id: 22,
    provincia: 'Chaco',
  },
  {
    id: 26,
    provincia: 'Chubut',
  },
  {
    id: 30,
    provincia: 'Entre Rios',
  },
  {
    id: 34,
    provincia: 'Formosa',
  },
  {
    id: 38,
    provincia: 'Jujuy',
  },
  {
    id: 42,
    provincia: 'La Pampa',
  },
  {
    id: 46,
    provincia: 'La Rioja',
  },
  {
    id: 50,
    provincia: 'Mendoza',
  },
  {
    id: 54,
    provincia: 'Misiones',
  },
  {
    id: 58,
    provincia: 'Neuquen',
  },
  {
    id: 62,
    provincia: 'Rio Negro',
  },
  {
    id: 66,
    provincia: 'Salta',
  },
  {
    id: 70,
    provincia: 'San Juan',
  },
  {
    id: 74,
    provincia: 'San Luis',
  },
  {
    id: 78,
    provincia: 'Santa Cruz',
  },
  {
    id: 82,
    provincia: 'Santa Fe',
  },
  {
    id: 86,
    provincia: 'Santiago del Estero',
  },
  {
    id: 90,
    provincia: 'Tucuman',
  },
  {
    id: 94,
    provincia: 'Tierra del Fuego',
  },
];

export async function seedProvincias(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Provincia);

  console.log('Revisando Tabla de Provincias...');
  const existDatos = await repo.count();
  if (existDatos > 0) {
    console.log(chalk.bgRed.white.bold('La tabla provincias NO ESTA VACIA.'));
    return;
  }

  console.info('Seeding Provincias...');

  const data = repo.create(Provincias);
  await repo.save(data);

  console.info('Provincias seed completado.');
}
