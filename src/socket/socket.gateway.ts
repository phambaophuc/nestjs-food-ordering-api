import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class SocketGateway {

    @WebSocketServer() server: Server;

    sendNewOrder(order: any) {
        this.server.emit('newOrder', order);
    }

    sendOrderStatusUpdate(updatedOrder: any) {
        this.server.emit('orderStatusUpdate', updatedOrder);
    }
}
