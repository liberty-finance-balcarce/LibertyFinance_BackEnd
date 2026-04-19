import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Provincia, Rol])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
