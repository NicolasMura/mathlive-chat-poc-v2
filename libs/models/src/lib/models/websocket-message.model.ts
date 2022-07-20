import { IWebSocketMessage, MessageTypes } from '../interfaces/websocket-message.interface';

export class WebSocketMessage implements IWebSocketMessage {
  constructor(
    public event: string,
    public data: {
      messageType: MessageTypes,
      isBroadcast: boolean,
      sender: string,
      createdAt: string,
      content: string,
      isMathliveContent?: boolean
    }
  ) { }
}
