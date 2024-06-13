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
import { createContext, useContext, useState } from "react";

import AppConstants from "@/constants";
import { isJSON } from "@/lib/util/string";
import { LogLevels, websocketLogger } from "@/lib/logger";
import { useConversationStore, useMessageStore } from "@/store";

const MAX_LOGS = 100;

interface WebsocketContextProps {
  ws: WebSocket | null;
  connected: boolean;
  logs: WebsocketLog[];
  disconnect: () => void;
  connect: (accessToken?: string) => void;
}

const WebsocketContext = createContext<WebsocketContextProps>(
  {} as WebsocketContextProps,
);

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<WebsocketLog[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();

  let reconnectAttempts = 0;

  const connect = (token?: string) => {
    if (!token && !accessToken) {
      websocketLogger.error("No access token for connection");
      return;
    }

    setAccessToken(token || accessToken);
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

    const connection = new WebSocket(AppConstants.websocketUrl, token);

    // Create all of the listeners for the websocket
    connection.onopen = onOpen;
    connection.onerror = onError;
    connection.onmessage = onMessage;
    connection.onclose = onClose;
  };

  const onOpen = (event: Event) => {
    const websocket = event.target as WebSocket;

    setWs(websocket);
    sendLog(`Connected to ${AppConstants.websocketUrl}`);

    reconnectAttempts = 0;
  };

  const onError = (event: Event) => {
    websocketLogger.error(`Error connecting to websocket: ${event}`);
  };

  const onMessage = (message: MessageEvent<any>) => {
    const data = message.data;

    const { isValid, parsedJSON } = isJSON(data);

    if (!isValid) {
      sendLog(`Received invalid JSON from websocket: ${data}`, "error");
      return;
    }

    // TODO: Add a zod validation here
    const payload = parsedJSON as WebsocketMessage;

    switch (payload.type) {
      case "NEW_MESSAGE":
        const conversation = payload.data.conversation;

        conversationStore.addConversations(conversation);
        messageStore.addMessages(conversation.messages[0]);
        break;
    }

    if (payload.notification) {
      Toast.show({
        type: "info",
        text1: payload.notification.title,
        text2: payload.notification.body,
      });
    }

    sendLog(`Received '${payload.type}' message from websocket`);
  };

  const onClose = (event: CloseEvent) => {
    const { code, reason } = event;

    if (code !== 1000 && reason !== "CLIENT_CLOSE") {
      sendLog(`Websocket connection closed unexpectedly: ${reason}`, "error");
      reconnect();
      return;
    }

    setWs(null);
  };

  const reconnect = () => {
    if (reconnectAttempts > 5) {
      sendLog("Failed to reconnect to websocket after 5 attempts", "error");
      return;
    }

    setTimeout(() => {
      connect(accessToken);
      reconnectAttempts++;
    }, 2000);
  };

  const disconnect = () => {
    if (ws) {
      ws.close(1000, "CLIENT_CLOSE");
    }

    sendLog("Closing websocket connection");
  };

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
