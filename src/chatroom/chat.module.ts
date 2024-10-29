import { Module } from '@nestjs/common';
import { ChatRoomGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
import { ChatService } from './chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [ChatRoomGateway, ChatService],
})
export class ChatRoomModule {}