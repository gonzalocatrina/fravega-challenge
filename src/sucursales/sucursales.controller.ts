import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SucursalesServices } from './sucursales.service';
import { SucursalDto } from './dtos/sucursal.dto';
import { PuntoDto } from './dtos/punto.dto';
import { ObjectId } from 'mongoose';

@Controller('sucursales')
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesServices) {}

  @Post()
  async createSucursal(@Body() sucursalDto: SucursalDto) {
    return this.sucursalesService.createSucursal(sucursalDto);
  }

  @Get()
  async sucursalByDistance(@Body() puntoDto: PuntoDto) {
    return this.sucursalesService.getSucuralByDistance(puntoDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId) {
    return this.sucursalesService.findOne(id);
  }
}
