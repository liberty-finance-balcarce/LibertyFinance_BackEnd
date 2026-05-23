import { DataSource } from 'typeorm';
import {
  PerfilInversor,
  PerfilInversorEnum,
} from 'src/perfil-inversor/entities/perfil-inversor.entity';
import { CreatePerfilInversorDto } from 'src/perfil-inversor/dto/create-perfil-inversor.dto';

export const PerfilInversores: CreatePerfilInversorDto[] = [
  {
    nombre: PerfilInversorEnum.CONSERVADOR,
  },
  {
    nombre: PerfilInversorEnum.MODERADO,
  },
  {
    nombre: PerfilInversorEnum.AGRESIVO,
  },
];

export async function seedPerfilInversor(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(PerfilInversor);
  console.info('Seeding Perfil Inversor...');

  const data = repo.create(PerfilInversores);
  await repo.save(data);
  console.info('Perfil Inversor seed completado.');
}
