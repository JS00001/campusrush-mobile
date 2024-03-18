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

import AppConstants from "@/constants";
import { isJSON } from "@/lib/util/string";
import { useConversationStore, useMessageStore } from "@/store";

export type MessageType = "NEW_MESSAGE";

export interface SocketMessage {
  type: MessageType;
  data: any;
  notification?: {
    title: string;
    body: string;
  };
}

interface WebsocketContextProps {
  data: {
    connected: boolean;
    messages: string[];
  };

  onConversationClose: () => void;
  onConversationOpen: (conversationId: string) => void;

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
  const [currentConversation, setCurrentConversation] = useState<string>("");

  // Get the addMessage function from the messages store
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();

  /**
   * Connects to the websocket with the given access token
   * @param accessToken The access token to connect with
   */
  const connect = (accessToken: string) => {
    let reconnectAttempts = 0;

    // If there is an existing websocket that is OPEN, return
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.info(
        "[WEBSOCKET] Already connected to %s",
        AppConstants.websocketUrl,
      );
      return;
    }

    // If there is a websocket that is not open but exists, close it
    if (ws) {
      ws.close();
    }

    // Create a new websocket with the access token as the header
    const newWs = new WebSocket(AppConstants.websocketUrl, accessToken);

    // When the websocket is opened, set the websocket and reset the reconnectAttempts
    newWs.onopen = () => {
      console.info("[WEBSOCKET] Connected to %s", AppConstants.websocketUrl);
      setWs(newWs);
      reconnectAttempts = 0;
    };

    /**
     * Reconnects to the websocket
     */
    const reconnect = () => {
      if (reconnectAttempts > 5) {
        console.info(
          "[WEBSOCKET] Failed to connect to %s after 5 attempts",
          AppConstants.websocketUrl,
        );
        return;
      }

      setTimeout(() => {
        connect(accessToken);
        reconnectAttempts++;
      }, 2000);
    };

    /**
     * Manage websocket.onerror
     */
    newWs.onerror = (event: Event) => {
      console.log("Websocket error", event);
    };

    /**
     * Manage websocket.onmessage
     */
    newWs.onmessage = (message: MessageEvent<any>) => {
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
          const pnmId = conversation?.pnm._id;

          if (!conversation || !pnmId) return;

          conversationStore.addConversations(conversation);
          messageStore.addMessages(pnmId, conversation.messages[0] || {});
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
     * Manage when a websocket is closed
     */
    newWs.onclose = (event) => {
      console.info(
        "[WEBSOCKET] Disconnected from %s",
        AppConstants.websocketUrl,
      );

      const { code, reason } = event;

      if (code !== 1000 && reason !== "CLIENT_CLOSE") {
        reconnect();
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
    if (ws) ws.close(1000, "CLIENT_CLOSE");
  };

  /**
   * Function for when a conversation is opened
   */
  const onConversationOpen = (conversationId: string) => {
    setCurrentConversation(conversationId);
  };

  /**
   * Function to test
   */
  // const markAsRead = (pnmId: string, conversation: Conversation) => {
  //   console.log("Marking as read", pnmId, currentConversation);
  //   if (!ws || ws.readyState !== WebSocket.OPEN) return;

  //   if (pnmId == currentConversation) {
  //     const payload = new SocketInput({
  //       type: "READ_CONVERSATION",
  //       data: { id: pnmId },
  //     });

  //     ws?.send(payload.toString());

  //     addConversations([
  //       {
  //         ...conversation,
  //         read: true,
  //       },
  //     ]);

  //     return;
  //   }

  //   addConversations([conversation]);
  // };

  /**
   * Function for when a conversation is closed
   */
  const onConversationClose = () => {
    setCurrentConversation("");
  };

  return (
    <WebsocketContext.Provider
      value={{
        data: {
          connected: ws?.readyState === WebSocket.OPEN,
          messages,
        },

        onConversationOpen,
        onConversationClose,

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
