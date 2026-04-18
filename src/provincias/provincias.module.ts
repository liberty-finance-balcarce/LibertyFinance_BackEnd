import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';
import { Provincia } from './entities/provincia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  controllers: [ProvinciasController],
  providers: [ProvinciasService],
})
export class ProvinciasModule {}
