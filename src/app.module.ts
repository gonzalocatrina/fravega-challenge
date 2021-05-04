import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstantsApp } from './common/constants.app';
import { SucursalesModule } from './sucursales/sucursales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: ConstantsApp.connection,
      useFactory: async (config: ConfigService) => ({
        uri: config.get('sucursalDB'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    SucursalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
