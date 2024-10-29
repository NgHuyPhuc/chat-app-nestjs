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
    origin: '*', // Cấu hình CORS nếu cần thiết
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Gateway đã khởi tạo');
  }

  handleConnection(client: Socket) {
    // console.log(`Client đã kết nối: ${client},  ${client.id}`);
    // console.log(`Client đã kết nối: ${client}`);

    // console.log('Client đã kết nối:', client);

    // In ra id của client
    console.log(`Client ID: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client đã ngắt kết nối: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    // console.log(`Nhận tin nhắn từ client: ${payload}`);
    console.log(`Nhận tin nhắn từ client:`, payload);
    // this.server.emit('message', `Server đã nhận tin nhắn: ${payload}`);
    this.server.emit('message', `Server đã nhận tin nhắn:`, payload );
  }
}
