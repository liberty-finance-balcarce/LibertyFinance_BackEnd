import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentosFinancierosModule } from './instrumentos-financieros/instrumentos-financieros.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransaccionHistoricoVentaModule } from './transaccion-historico-venta/transaccion-historico-venta.module';
import { TransaccionHistoricoCompraModule } from './transaccion-historico-compra/transaccion-historico-compra.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { PerfilInversorModule } from './perfil-inversor/perfil-inversor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    AuthModule,
    InstrumentosFinancierosModule,
    PerfilInversorModule,
    ProvinciasModule,
    RolModule,
    TransaccionHistoricoCompraModule,
    TransaccionHistoricoVentaModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
