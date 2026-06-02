import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { PerfilInversor } from 'src/perfil-inversor/entities/perfil-inversor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Provincia, Rol, PerfilInversor]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
