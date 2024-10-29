import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatRoomGatezzway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private rooms: { 
    [key: string]: { clientId: string; message: string }[] 
  } = {}; // Lưu trữ tin nhắn theo phòng

  afterInit(server: Server) {
    console.log('Gateway đã khởi tạo');
  }

  handleConnection(client: Socket) {
    console.log(`Client đã kết nối: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client đã ngắt kết nối: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`${client.id} đã tham gia phòng ${room}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, { room, message }: { room: string, message: string }) {
    console.log(`Nhận tin nhắn từ ${client.id} trong phòng ${room}: ${message}`);
    this.server.to(room).emit('message', { clientId: client.id, message });

    // Lưu trữ tin nhắn
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push({ clientId: client.id, message }); // Bây giờ đây là đúng kiểu dữ liệu
  }

  @SubscribeMessage('getMessages')
  handleGetMessages(client: Socket, room: string) {
    client.emit('messages', this.rooms[room] || []);
  }
}
