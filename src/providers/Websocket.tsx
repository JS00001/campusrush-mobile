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
import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { WebsocketLog, WebsocketMessage } from "@/types/websocket";

import AppConstants from "@/constants";
import { isJSON } from "@/lib/util/string";
import { useUser } from "@/providers/User";
import { useBottomSheet } from "@/providers/BottomSheet";
import { LogLevels, websocketLogger } from "@/lib/logger";
import { getAccessToken } from "@/lib/auth";
import queryClient from "@/lib/query-client";

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
  const { chapter } = useUser();
  const { openBottomSheet } = useBottomSheet();

  const ws = useRef<WebSocket | null>(null);
  const [logs, setLogs] = useState<WebsocketLog[]>([]);

  let reconnectAttempts = 0;

  /**
   * Keeps the websockets connection synced with the access token, when the
   * user logs in or log out, perform the necessary actions to connect or
   * disconnect the websocket
   */
  useEffect(() => {
    if (!chapter) disconnect();
    else connect();
  }, [chapter]);

  /**
   * Attempt to connect to the websocket
   */
  const connect = async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      websocketLogger.error("No access token for connection");
      return;
    }

    sendLog("Attempting to connect to websocket");

    // If we are already connected, don't try to connect again
    if (ws.current && ws.current.readyState === ws.current.OPEN) {
      sendLog("Already connected to websocket");
      return;
    }

    // If we are storing a connection, but are not currently connected, close the connection
    if (ws.current) {
      ws.current.close();
    }

    const connection = new WebSocket(AppConstants.WebsocketURL, accessToken);

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
    ws.current = websocket;
    reconnectAttempts = 0;
    sendLog(`Connected to ${AppConstants.WebsocketURL}`);
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

    // Handle notifications
    if (notification) {
      queryClient.refetchQueries({ queryKey: ["notifications"] });
    }

    // Handle toast notifications
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
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversation", pnmId] });
    }

    if (socketMessage.type === "NEW_PNM") {
      queryClient.invalidateQueries({ queryKey: ["pnms"] });
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

    if (socketMessage.type === "MESSAGE_ERROR") {
      const message = socketMessage.data.payload.message;
      queryClient.invalidateQueries({
        queryKey: ["conversation", message.pnm],
      });
    }

    if (socketMessage.type === "NEW_EVENT_RESPONSE") {
      const event = socketMessage.data.payload.event;
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", event._id] });
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

    ws.current = null;
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
    if (!ws.current) {
      return;
    }

    ws.current.close(1000, "CLIENT_CLOSE");
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

  const connected = ws.current?.readyState === WebSocket.OPEN;

  return (
    <WebsocketContext.Provider
      value={{
        ws: ws.current,
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
