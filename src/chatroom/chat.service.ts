import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  // Lưu tin nhắn
  async saveMessage(room: string, clientId: string, message: string): Promise<Message> {
    const newMessage = new this.messageModel({ room, clientId, message });
    return newMessage.save();
  }

  // Lấy tin nhắn theo phòng
  async getMessages(room: string): Promise<Message[]> {
    // console.log("🚀 ~ ChatService ~ getMessages ~ room:", room); // Kiểm tra giá trị của `room`
    
    const messages = await this.messageModel.find({ room }).exec(); // Truy vấn từ MongoDB
    
    // console.log("🚀 ~ ChatService ~ getMessages ~ messages:", messages); // Kiểm tra dữ liệu nhận được
    return messages;
}
}
