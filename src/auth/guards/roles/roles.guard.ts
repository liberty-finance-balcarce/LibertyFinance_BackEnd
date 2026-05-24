import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // El Reflector es el que nos permite leer la metadata del decorador @Roles
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtenemos los roles permitidos para este método/controlador
    const requiredRoles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si el método no tiene el decorador @Roles, se considera público (dentro de los logueados)
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtenemos al usuario de la petición (inyectado previamente por el JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // 4. Verificamos si el rol del usuario está incluido en los roles requeridos
    // Asumiendo que en tu JWT pusiste: { rol: usuario.rol.id_rol }
    const hasRole = requiredRoles.includes(user.rol);

    if (!hasRole) {
      throw new ForbiddenException('Tu rol no permite realizar esta acción');
    }

    return hasRole;
  }
}