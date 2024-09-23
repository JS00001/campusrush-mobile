/*
 * Created on Wed Jun 12 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";
import { createContext, useContext, useEffect, useState } from "react";

import type { WebsocketLog, WebsocketMessage } from "@/types/websocket";

import {
  useConversationStore,
  useGlobalStore,
  useMessageStore,
  useNotificationStore,
} from "@/store";
import AppConstants from "@/constants";
import { isJSON } from "@/lib/util/string";
import { useAuth } from "@/providers/Auth";
import { useBottomSheet } from "@/providers/BottomSheet";
import { LogLevels, websocketLogger } from "@/lib/logger";

const MAX_LOGS = 100;

interface IWebsocketContext {
  ws: WebSocket | null;
  connected: boolean;
  logs: WebsocketLog[];
  disconnect: () => void;
  connect: (accessToken?: string) => void;
}

const WebsocketContext = createContext<IWebsocketContext>(
  {} as IWebsocketContext,
);

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [logs, setLogs] = useState<WebsocketLog[]>([]);

  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const notificationStore = useNotificationStore();
  const conversationStore = useConversationStore();

  let reconnectAttempts = 0;

  /**
   * Keeps the websockets connection synced with the access token, when the
   * user logs in or log out, perform the necessary actions to connect or
   * disconnect the websocket
   */
  useEffect(() => {
    if (!accessToken) {
      disconnect();
      return;
    }

    connect();
  }, [accessToken]);

  /**
   * Attempt to connect to the websocket
   */
  const connect = () => {
    if (!accessToken) {
      websocketLogger.error("No access token for connection");
      return;
    }

    sendLog("Attempting to connect to websocket");

    // If we are already connected, don't try to connect again
    if (ws && ws.readyState === ws.OPEN) {
      sendLog("Already connected to websocket");
      return;
    }

    // If we are storing a connection, but are not currently connected, close the connection
    if (ws) {
      ws.close();
    }

    const connection = new WebSocket(AppConstants.websocketUrl, accessToken);

    // Create all of the listeners for the websocket
    connection.onopen = onOpen;
    connection.onerror = onError;
    connection.onmessage = onMessage;
    connection.onclose = onClose;
  };

  /**
   * When the websocket opens its connection
   */
  const onOpen = (event: Event) => {
    const websocket = event.target as WebSocket;

    setWs(websocket);
    sendLog(`Connected to ${AppConstants.websocketUrl}`);

    reconnectAttempts = 0;
  };

  /**
   * When the websocket encounters an error (e.g. connection error, etc.)
   */
  const onError = (event: Event) => {
    websocketLogger.error(`Error connecting to websocket: ${event}`);
  };

  /**
   * When the websocket receives a message from the server, parse/handle it
   */
  const onMessage = async (message: MessageEvent<any>) => {
    const data = message.data;
    const { isValid, parsedJSON } = isJSON(data);

    if (!isValid) {
      sendLog(`Received invalid JSON from websocket: ${data}`, "error");
      return;
    }

    const socketMessage = parsedJSON as WebsocketMessage;

    const notification = socketMessage.data.notification;
    if (notification) notificationStore.addOrUpdateNotification(notification);

    if (socketMessage.toastNotification) {
      Toast.show({
        type: "info",
        text1: socketMessage.toastNotification.title,
        text2: socketMessage.toastNotification.body,
      });
    }

    sendLog(`Received '${socketMessage.type}' message from websocket`);

    // Handle the different types of messages that can be received
    if (socketMessage.type === "NEW_MESSAGE") {
      const conversation = socketMessage.data.payload.conversation;

      const pnmId = conversation.pnm._id;
      const existingMessages = messageStore.getMessages(pnmId) || [];

      conversationStore.addConversations(conversation);

      // If we are just opening the conversation, the message store is empty (This store is in memory)
      // So we should add all of the messages we know about
      if (!existingMessages.length) {
        messageStore.addMessages(conversation.messages.reverse());
      } else {
        messageStore.addMessages(conversation.messages[0]);
      }
    }

    if (socketMessage.type === "NEW_PNM") {
      const pnm = socketMessage.data.payload.pnm;
      globalStore.addOrUpdatePnm(pnm);
    }

    if (socketMessage.type === "NEW_DYNAMIC_NOTIFICATION") {
      const data = socketMessage.data.payload;
      openBottomSheet("DYNAMIC_NOTIFICATION", {
        title: data.title,
        message: data.message,
        iconName: data.iconName,
        iconColor: data.iconColor,
      });
    }
  };

  /**
   * When the websocket connection is closed
   */
  const onClose = (event: CloseEvent) => {
    const { code, reason } = event;

    if (code !== 1000 && reason !== "CLIENT_CLOSE") {
      sendLog(`Websocket connection closed unexpectedly: ${reason}`, "error");
      reconnect();
      return;
    }

    setWs(null);
  };

  /**
   * Attempt to reconnect to the websocket
   */
  const reconnect = () => {
    if (reconnectAttempts > 5) {
      sendLog("Failed to reconnect to websocket after 5 attempts", "error");
      reconnectAttempts = 0;
      return;
    }

    setTimeout(() => {
      connect();
      reconnectAttempts++;
    }, 2000);
  };

  /**
   * Close a websocket connection
   */
  const disconnect = () => {
    if (!ws) {
      return;
    }

    ws.close(1000, "CLIENT_CLOSE");
    sendLog("Closing websocket connection");
  };

  /**
   * Send a log to the websocket and store it in the logs state
   */
  const sendLog = (message: string, level: LogLevels = "info") => {
    const log = {
      timestamp: Date.now(),
      message,
    };

    websocketLogger[level](log.message);
    setLogs((logs) => [log, ...logs].slice(0, MAX_LOGS));
  };

  const connected = ws?.readyState === WebSocket.OPEN;

  return (
    <WebsocketContext.Provider
      value={{
        ws,
        connected,
        logs,
        disconnect,
        connect,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);

export default WebsocketProvider;
