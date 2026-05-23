import { DataSource } from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { CreateRolDto } from 'src/rol/dto/create-rol.dto';

export const Roles: CreateRolDto[] = [
  {
    nombre: 'Administrador',
  },
  {
    nombre: 'Usuario',
  },
];

export async function seedRol(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Rol);

  console.info('Seeding Rol...');

  await dataSource.query('TRUNCATE TABLE rol');

  const data = repo.create(Roles);
  await repo.save(data);

  console.info('Rol seed completado.');
}
