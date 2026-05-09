import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 'jwt' es el nombre por defecto que busca Passport para la estrategia
export class JwtAuthGuard extends AuthGuard('jwt') {

  
}