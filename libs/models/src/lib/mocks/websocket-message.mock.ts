import { WebSocketMessage } from '../models/websocket-message.model';
import { MessageTypes } from '../interfaces/websocket-message.interface';


const getDefaults = (): WebSocketMessage => ({
  event: 'message',
  data: {
    messageType: MessageTypes.USER_MESSAGE,
    isBroadcast: false,
    sender: "Nikouz",
    content: "Hello!",
    createdAt: "",
    isMathliveContent: false
  }
});

export const getWebSocketMessageMock = (webSocketmessage?: Partial<WebSocketMessage>): WebSocketMessage => ({
  ...getDefaults(),
  ...webSocketmessage
});
