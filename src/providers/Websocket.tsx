/*
 * Created on Fri Nov 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";
import { createContext, useContext, useState } from "react";

import { isJSON } from "@/lib/string";
import { WEBSOCKET_URL } from "@/api/constants";
import useMessagesStore from "@/state/messaging/messages";
import useConversationsStore from "@/state/messaging/conversations";

interface WebsocketContextProps {
  data: {
    connected: boolean;
    messages: string[];
  };

  disconnect: () => void;
  connect: (accessToken: string) => void;
}

const WebsocketContext = createContext<WebsocketContextProps>(
  {} as WebsocketContextProps,
);

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Create state to store the websocket and messages
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Get the addMessage function from the messages store
  const addMessage = useMessagesStore((s) => s.addMessage);

  // Get the addConversations function from the conversations store
  const addConversations = useConversationsStore((s) => s.addConversations);

  /**
   * Connects to the websocket with the given access token
   * @param accessToken The access token to connect with
   */
  const connect = (accessToken: string) => {
    let reconnectAttempts = 0;

    // If there is an existing websocket that is OPEN, return
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.info("[WEBSOCKET] Already connected to %s", WEBSOCKET_URL);
      return;
    }

    // If there is a websocket that is not open but exists, close it
    if (ws) {
      ws.close();
    }

    // Create a new websocket with the access token as the header
    const newWs = new WebSocket(WEBSOCKET_URL, accessToken);

    // When an error occurs, call onError to handle it
    newWs.onerror = onError;

    // When a message is received, call onMessage to handle it
    newWs.onmessage = onMessage;

    // When the websocket is opened, set the websocket and reset the reconnectAttempts
    newWs.onopen = () => {
      console.info("[WEBSOCKET] Connected to %s", WEBSOCKET_URL);
      setWs(newWs);
      reconnectAttempts = 0;
    };

    // When the websocket is closed, check the reason and code
    newWs.onclose = (event) => {
      console.info("[WEBSOCKET] Disconnected from %s", WEBSOCKET_URL);

      const { code, reason } = event;

      if (code !== 1000 && reason !== "CLIENT_CLOSE") {
        reconnect(accessToken, reconnectAttempts);
        return;
      }

      setWs(null);
    };
  };

  /**
   * Disconnects the websocket if it exists
   */
  const disconnect = () => {
    // If there is an existing websocket, close it
    if (ws) {
      ws.close(1000, "CLIENT_CLOSE");
    }
  };

  /**
   * Reconnection
   */
  const reconnect = (accessToken: string, reconnectAttempts: number) => {
    if (reconnectAttempts > 5) {
      console.info(
        "[WEBSOCKET] Failed to connect to %s after 5 attempts",
        WEBSOCKET_URL,
      );
      return;
    }

    setTimeout(() => {
      connect(accessToken);
      reconnectAttempts++;
    }, 2000);
  };

  /**
   * Manage websocket.onmessage
   */
  const onMessage = (message: MessageEvent<any>) => {
    // Get the data from the message
    const data = message.data;

    // Ensure that the data is a valid JSON string
    const { isValid, parsedJSON } = isJSON(data);

    // If the data is not a valid JSON string, return
    if (!isValid) return;

    // Ensure that the parsedData matches with SocketMessage
    const payload = parsedJSON as SocketMessage;

    // Add the message to the messages state
    setMessages((messages) => [data, ...messages]);

    switch (payload.type) {
      case "NEW_MESSAGE":
        const conversation = payload.data.conversation as Conversation;

        if (!conversation) return;

        const pnmId = conversation.pnm._id;

        if (!pnmId) return;

        addConversations([conversation]);
        addMessage(pnmId, conversation.messages[0] || {});
        break;
    }

    if (payload.notification) {
      Toast.show({
        type: "info",
        text1: payload.notification.title,
        text2: payload.notification.body,
      });
    }
  };

  /**
   * Manage websocket.onerror
   */
  const onError = (event: Event) => {
    console.log("Websocket error", event);
  };

  return (
    <WebsocketContext.Provider
      value={{
        data: {
          connected: ws?.readyState === WebSocket.OPEN,
          messages,
        },

        connect,
        disconnect,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);

export default WebsocketProvider;
