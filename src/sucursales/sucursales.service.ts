import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { Sucursal } from './model/sucursal.model';
import { SucursalDto } from './dtos/sucursal.dto';
import { getDistance } from 'geolib';
import { PuntoDto } from './dtos/punto.dto';
import { ConstantsApp } from '../common/constants.app';

@Injectable()
export class SucursalesServices {
  constructor(
    @InjectModel(Sucursal.name)
    private readonly sucursal: Model<Sucursal>,
    @InjectConnection(ConstantsApp.connection)
    private readonly connection: Connection,
  ) {}

  async createSucursal(sucursalDto: SucursalDto) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const sucursal = new this.sucursal();
      sucursal.direccion = sucursalDto.direccion;
      sucursal.latitud = sucursalDto.latitud;
      sucursal.longitud = sucursalDto.longitud;
      await sucursal.save();
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      console.error(error);
      throw new Error(ConstantsApp.CREATE_SUCURSALES_ERROR);
    }
    return;
  }
  async getSucuralByDistance(punto: PuntoDto) {
    const sucursales = await this.sucursal.find().exec();
    if (!sucursales) {
      throw new BadRequestException(ConstantsApp.EMPTY_SUCURSALES);
    }
    let sucursal;
    let distancia;
    for (let i = 0; i < sucursales.length; i++) {
      
      if (i === 0) {

        distancia = getDistance({latitude: sucursales[i].latitud,longitude: sucursales[i].longitud,},{ latitude: punto.latitud, longitude: punto.longitud },);
        sucursal = sucursales[i];

      } else if (distancia > getDistance({latitude: sucursales[i].latitud,longitude: sucursales[i].longitud},{ latitude: punto.latitud, longitude: punto.longitud },)){

        distancia = getDistance({ latitude: sucursales[i].latitud, longitude: sucursales[i].longitud,},{ latitude: punto.latitud, longitude: punto.longitud },);
        sucursal = sucursales[i];
      }
    }
    return sucursal;
  }

  async findOne(id: ObjectId) {
    const sucursal = await this.sucursal.findById({ _id: id })
    if(!sucursal){
      throw new Error(ConstantsApp.SUCURAL_ERROR);
    }
    return sucursal;
  }
}
