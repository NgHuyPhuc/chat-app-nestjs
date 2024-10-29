import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './test/events.module';
import { ChatRoomModule } from './chatroom/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ChatModule, 
    // EventsModule, 
    ChatRoomModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI'),
    //   }),
    //   inject: [ConfigService],
    // }), 
    MongooseModule.forRoot('mongodb://localhost:27017/chat'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
