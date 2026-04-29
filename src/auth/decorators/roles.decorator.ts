import { SetMetadata } from '@nestjs/common';

// Esta clave la usaremos en el Guard para recuperar los roles
export const ROLES_KEY = 'roles';

// Este decorador recibirá una lista de IDs de roles (ej: 1 para admin, 2 para user)
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles);