import { DataSource } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export const Usuarios: CreateUsuarioDto[] = [
  {
    dni_usuario: 26134695,
    nombre: 'cristian',
    apellido: 'falcone',
    mail: 'cristianfalcone@hotmail.com',
    contraseña: '$2b$10$8MRJtgvy4DCi9HUPsXJv9O9o/nZzuer6e5.S0xPN9wbJVxyi/Yd0O',
    fecha_nacimiento: '1977-11-07',
    foto_perfil: 'https://imagenes.com/perfil.jpg',
    numero_telefono: '2266532427',
    direccion: 'calle 20',
    id_provincia: 6,
    id_perfilinv: 1,
    id_codigo_referidos: 1,
    id_rol: 2,
  },
  {
    dni_usuario: 37398970,
    nombre: 'Matias',
    apellido: 'Mendez',
    mail: 'matimendez@hotmail.com',
    contraseña: '$2b$10$8MRJtgvy4DCi9HUPsXJv9O9o/nZzuer6e5.S0xPN9wbJVxyi/Yd0O',
    fecha_nacimiento: '1994-05-16',
    foto_perfil: 'https://imagenes.com/perfil.jpg',
    numero_telefono: '2266555555',
    direccion: 'calle 14',
    id_provincia: 6,
    id_perfilinv: 1,
    id_codigo_referidos: 1,
    id_rol: 2,
  },
  {
    dni_usuario: 52000000,
    nombre: 'Tizi',
    apellido: 'Luzi Ramos',
    mail: 'tizilr@hotmail.com',
    contraseña: '$2b$10$8MRJtgvy4DCi9HUPsXJv9O9o/nZzuer6e5.S0xPN9wbJVxyi/Yd0O',
    fecha_nacimiento: '2008-01-17',
    foto_perfil: 'https://imagenes.com/perfil.jpg',
    numero_telefono: '2266566666',
    direccion: 'calle 24',
    id_provincia: 6,
    id_perfilinv: 1,
    id_codigo_referidos: 1,
    id_rol: 2,
  },
  {
    dni_usuario: 36000000,
    nombre: 'Milena',
    apellido: 'Martinez',
    mail: 'milemartinez@hotmail.com',
    contraseña: '$2b$10$8MRJtgvy4DCi9HUPsXJv9O9o/nZzuer6e5.S0xPN9wbJVxyi/Yd0O',
    fecha_nacimiento: '2005-07-04',
    foto_perfil: 'https://imagenes.com/perfil.jpg',
    numero_telefono: '2266577777',
    direccion: 'calle Desconocida',
    id_provincia: 6,
    id_perfilinv: 1,
    id_codigo_referidos: 1,
    id_rol: 2,
  },
];

export async function seedUsuarios(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Usuario);

  console.log('Revisando Tabla de Usuarios...');
  const existDatos = await repo.count();
  if (existDatos > 0) {
    console.log('La tabla usuarios NO ESTA VACIA.');
    return;
  }

  console.info('Seeding Usuarios...');

  const data = repo.create(Usuarios);
  await repo.save(data);

  console.info('Usuarios seed completado.');
}
