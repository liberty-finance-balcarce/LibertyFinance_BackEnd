import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { seedProvincias } from './seeders/provincias';
import { seedUsuarios } from './seeders/usuarios';

async function runSeeders(): Promise<void> {
  await AppDataSource.initialize();
  console.info('Database connected. Running seeders...\n');

  console.log('Provincias Seeder');
  await seedProvincias(AppDataSource);

    console.log('Usuarios Seeder');
  await seedUsuarios(AppDataSource);

  await AppDataSource.destroy();
  console.log('\nAll seeders completed successfully.');
}

runSeeders().catch((error) => {
  console.error('Seeding failed: ', error);
  process.exit(1);
});
