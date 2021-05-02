import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Sucursal } from "./model/sucursal.model";
import { SucursalDto } from "./dtos/sucursal.dto";
import { getDistance } from 'geolib';
import { PuntoDto } from "./dtos/punto.dto";

@Injectable()
export class SucursalesServices{

    constructor(@InjectModel(Sucursal.name)
    private readonly sucursal: Model<Sucursal>){}

    async createSucursal(sucursalDto:SucursalDto){
        const sucursal = new this.sucursal();
        sucursal.direccion = sucursalDto.direccion;
        sucursal.latitud = sucursalDto.latitud;
        sucursal.longitud = sucursalDto.longitud;
        return await sucursal.save();

    }
    async getSucuralByDistance(punto:PuntoDto){
        const sucursales = await this.sucursal.find().exec();
        if(!sucursales){
            throw new BadRequestException("No hay sucursales disponibles")
        }
        let sucursal = sucursales[0];
        console.log(sucursales.length);
        let distancia;
        for (let i = 0; i < sucursales.length; i++) {
            if(i === 0){
                 distancia  = getDistance({ latitude:sucursales[i].latitud, longitude:sucursales[i].longitud}, { latitude:punto.latitud,longitude:punto.longitud});
                 sucursal = sucursales[i];
            }
            else if(distancia > getDistance({ latitude:sucursales[i].latitud, longitude:sucursales[i].longitud}, { latitude:punto.latitud,longitude:punto.longitud})){
                distancia = getDistance({ latitude:sucursales[i].latitud, longitude:sucursales[i].longitud}, { latitude:punto.latitud,longitude:punto.longitud});
                sucursal = sucursales[i];
            }     
        }
        return sucursal;       
    }

    async findOne(id:ObjectId){
        return this.sucursal.findById({_id:id});
    }

}