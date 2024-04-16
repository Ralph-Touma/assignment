import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
      origin: '*',
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
      console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string): void {
      console.log(`Received message: ${message} from ${client.id}`);
      this.server.emit('messageReceived', message); 
  }

  @SubscribeMessage('broadcastUpdate')
  onBroadcastUpdate(@MessageBody() data: { update: string }): void {
      console.log(`Broadcasting update: ${data.update}`);
      this.server.emit('receiveUpdate', data.update); 
  }

  @SubscribeMessage('requestData')
  onRequestData(@ConnectedSocket() client: Socket, @MessageBody() data: { request: string }): void {
      console.log(`Data request from ${client.id} for ${data.request}`);
      client.emit('responseData', { data: 'Response to ' + data.request });
  }
}
