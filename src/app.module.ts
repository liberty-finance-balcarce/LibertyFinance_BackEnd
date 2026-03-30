import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstrumentosFinancierosModule } from './instrumentos-financieros/instrumentos-financieros.module';
import { ProvinciasModule } from './provincias/provincias.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
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
    InstrumentosFinancierosModule
  ],
    }), ProvinciasModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
