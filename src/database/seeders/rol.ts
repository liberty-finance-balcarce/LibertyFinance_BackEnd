import { DataSource } from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { CreateRolDto } from 'src/rol/dto/create-rol.dto';

export const Roles: CreateRolDto[] = [
  {
    nombre: 'user',
  },
  {
    nombre: 'admin',
  },
];

export async function seedRol(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Rol);

  console.log('Revisando Tabla de Roles...');
  const existDatos = await repo.count();
  if (existDatos > 0) {
    console.log('La tabla de Rol NO ESTA VACÍA.');
    return;
  }

  const data = repo.create(Roles);
  await repo.save(data);

  console.info('Rol seed completado.');
}
