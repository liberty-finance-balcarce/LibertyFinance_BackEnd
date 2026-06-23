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
  {
    nombre: PerfilInversorEnum.EXPERTO,
  },
];

export async function seedPerfilInversor(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(PerfilInversor);

  console.log('Revisando Tabla de Perfiles Inversores...');
  const existDatos = await repo.count();
  if (existDatos > 0) {
    console.log('La tabla de Perfiles Inversores NO ESTA VACÍA.');
    return;
  }

  const data = repo.create(PerfilInversores);
  await repo.save(data);
  console.log('Tabla de Perfiles Inversores Sembrada Correctamente.');
}
