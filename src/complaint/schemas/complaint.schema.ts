import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Category } from '../../category/schemas/category.schema'; 
export type ComplaintDocument = Complaint & Document;

@Schema()
export class Complaint {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' })
  status: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
