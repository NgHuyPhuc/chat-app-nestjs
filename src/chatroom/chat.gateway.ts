import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatRoomGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { room: string; message: string },
  ): Promise<void> {
    const { room, message } = payload;

    // Lưu tin nhắn vào database
    await this.chatService.saveMessage(room, client.id, message);

    // Phát tin nhắn đến tất cả các client trong phòng
    this.server.to(room).emit('message', { clientId: client.id, message });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    console.log(`Client ${client.id} đã vào phòng: ${room}`);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, room: string): Promise<void> {
    // console.log("🚀 ~ handleGetMessages ~ room:", room)
    const zairoom  = room;
    console.log('Room nhận được:', zairoom); // Log để kiểm tra

    // Lấy tin nhắn từ database
    const messages = await this.chatService.getMessages(room);
    console.log("🚀 ~ handleGetMessages ~ messages:", messages)

    // Phát lại tin nhắn cho client
    client.emit('messages', messages);
  }
}
