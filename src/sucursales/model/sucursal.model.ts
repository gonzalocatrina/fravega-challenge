import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, strict: true })
export class Sucursal extends Document {
  @Prop()
  direccion: string;

  @Prop()
  latitud: string;

  @Prop()
  longitud: string;
}

export const SucursalSchema = SchemaFactory.createForClass(Sucursal);
