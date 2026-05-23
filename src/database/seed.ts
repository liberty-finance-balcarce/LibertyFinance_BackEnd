import { AppDataSource } from './data-source';
import { seedInstrumentosFinancieros } from './seeders/instrumentos-financieros';
import { seedPerfilInversor } from './seeders/perfil-inversor';
import { seedRol } from './seeders/rol';
import { seedProvincias } from './seeders/provincias';
import { seedUsuarios } from './seeders/usuarios';
import { seedTransaccionHistoricoCompra } from './seeders/transaccion-historico-compra';
import { seedTransaccionHistoricoVenta } from './seeders/transaccion-historico-venta';

async function runSeeders(): Promise<void> {
  await AppDataSource.initialize();

  console.info('Database connected. Running seeders...\n');

  await seedRol(AppDataSource);

  await seedProvincias(AppDataSource);

  await seedPerfilInversor(AppDataSource);

  await seedUsuarios(AppDataSource);

  await seedInstrumentosFinancieros(AppDataSource);

  await seedTransaccionHistoricoCompra(AppDataSource);

  await seedTransaccionHistoricoVenta(AppDataSource);

  await AppDataSource.destroy();
  console.log('\nAll seeders completed successfully.');
}

runSeeders().catch((error) => {
  console.error('Seeding failed: ', error);
  process.exit(1);
});
