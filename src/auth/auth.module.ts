import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
<<<<<<< HEAD

@Module({
  imports: [
=======
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '24h' },
      }),
      global: true, 
    }),
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService],
=======
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService]
>>>>>>> b3e82ee24ba1fbd8551e22094e874f66fadeb592
})
export class AuthModule {}
