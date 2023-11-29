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

  // Get the addConversations function from the conversations store
  const addConversations = useConversationsStore((s) => s.addConversations);

  // Get the addConversations function from the messages store
  const addMessage = useMessagesStore((s) => s.addMessage);

  /**
   * Connects to the websocket with the given access token
   * @param accessToken The access token to connect with
   */
  const connect = (accessToken: string) => {
    // If there is an existing websocket, close it
    if (ws) ws.close();

    // Create a new websocket with the access token as the header
    const newWs = new WebSocket(WEBSOCKET_URL, accessToken);

    newWs.onopen = () => {
      console.info("[WEBSOCKET] Connected to %s", WEBSOCKET_URL);
      setWs(newWs);
    };

    newWs.onclose = () => {
      console.info("[WEBSOCKET] Disconnected from %s", WEBSOCKET_URL);
      setWs(null);
    };

    newWs.onerror = (error) => {
      console.log("Websocket error", error);
    };

    newWs.onmessage = (message) => {
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
  };

  /**
   * Disconnects the websocket if it exists
   */
  const disconnect = () => {
    // If there is an existing websocket, close it
    if (ws) ws.close();

    // Set the websocket to null
    setWs(null);
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
