import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class SucursalDto {
  @IsString()
  direccion: string;

  @IsLatitude()
  latitud: string;

  @IsLongitude()
  @IsString()
  longitud: string;
}
