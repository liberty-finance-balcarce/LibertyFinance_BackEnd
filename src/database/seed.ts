import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { seedProvincias } from './seeders/provincias';

async function runSeeders(): Promise<void> {
  await AppDataSource.initialize();
  console.info('Database connected. Running seeders...\n');

  console.log('[Provincias Seeder');
  await seedProvincias(AppDataSource);

  await AppDataSource.destroy();
  console.log('\nAll seeders completed successfully.');
}

runSeeders().catch((error) => {
  console.error('Seeding failed: ', error);
  process.exit(1);
});
