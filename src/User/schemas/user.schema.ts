import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVIP: boolean;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isEmployee: boolean;

  @Prop()
  refreshToken?: string; 
}

export const UserSchema = SchemaFactory.createForClass(User);
