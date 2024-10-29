import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'messages' })
export class Message {
  // @Prop({ required: true })
  @Prop()
  room: string;

  // @Prop({ required: true })
  @Prop()
  clientId: string;

  // @Prop({ required: true })
  @Prop()
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
