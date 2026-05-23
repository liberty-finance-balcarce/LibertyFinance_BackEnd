import { AppDataSource } from './data-source';
import { seedInstrumentosFinancieros } from './seeders/instrumentos-financieros';
import {seedPerfilInversor} from './seeders/perfil-inversor';
import {seedRols} from './seeders/rol'

async function runSeeders(): Promise<void> {
  await AppDataSource.initialize();

  console.info('Database connected. Running seeders...\n');

  console.log('Seeding Instrumentos Financieros...');
  await seedInstrumentosFinancieros(AppDataSource);

  console.log('Seeding Perfil Inversor...');
  await seedPerfilInversor(AppDataSource);

  await AppDataSource.destroy();
  console.log('\nAll seeders completed successfully.');
}

runSeeders().catch((error) => {
  console.error('Seeding failed: ', error);
  process.exit(1);
});
