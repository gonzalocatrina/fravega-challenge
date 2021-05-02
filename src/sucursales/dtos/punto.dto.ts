import { IsLatitude, IsLongitude, IsString } from "class-validator";

export class PuntoDto{

    @IsLatitude()
    @IsString()
    latitud:string;

    @IsLongitude()
    @IsString()
    longitud:string;
}