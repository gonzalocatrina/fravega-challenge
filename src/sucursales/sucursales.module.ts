import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sucursal, SucursalSchema } from './model/sucursal.model';
import { SucursalesController } from './sucursales.controller';
import { SucursalesServices } from './sucursales.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: Sucursal.name, schema: SucursalSchema }],"fravega")],
  controllers: [SucursalesController],
  providers: [SucursalesServices]
})
export class SucursalesModule {}
