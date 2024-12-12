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
import { useDebouncedCallback } from "use-debounce";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { WebsocketLog, WebsocketMessage } from "@/types/websocket";

import AppConstants from "@/constants";
import { isJSON } from "@/lib/util/string";
import { useUser } from "@/providers/User";
import { getAccessToken } from "@/lib/auth";
import queryClient from "@/lib/query-client";
import { useBottomSheetStore } from "@/store";
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
  const { chapter } = useUser();
  const navigation = useNavigation();
  const bottomSheetStore = useBottomSheetStore();

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
  const connect = useDebouncedCallback(async () => {
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
  }, 1000);

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

    sendLog(`Received '${socketMessage.type}' message from websocket`);

    switch (socketMessage.type) {
      case "NEW_MESSAGE": {
        const conversation = socketMessage.data.payload.conversation;
        const pnmId = conversation.pnm._id;
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({ queryKey: ["conversation", pnmId] });
        break;
      }

      case "NEW_PNM": {
        const pnm = socketMessage.data.payload.pnm;
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
        queryClient.invalidateQueries({ queryKey: ["pnms"] });

        // Handle toast notifications
        if (!socketMessage.toastNotification) return;
        Toast.show({
          type: "info",
          text1: socketMessage.toastNotification.title,
          text2: socketMessage.toastNotification.body,
          onPress: () => {
            bottomSheetStore.open("PNM", { pnm });
            navigation.navigate("Main", {
              screen: "PNMsTab",
              params: {
                screen: "PNMs",
              },
            });
          },
        });

        break;
      }

      case "MESSAGE_ERROR": {
        const message = socketMessage.data.payload.message;
        queryClient.invalidateQueries({
          queryKey: ["conversation", message.pnm],
        });
        break;
      }

      case "NEW_DYNAMIC_NOTIFICATION": {
        const data = socketMessage.data.payload;
        bottomSheetStore.open("DYNAMIC_NOTIFICATION", {
          title: data.title,
          message: data.message,
          iconName: data.iconName,
          iconColor: data.iconColor,
        });
        break;
      }

      case "NEW_EVENT_RESPONSE": {
        const event = socketMessage.data.payload.event;
        queryClient.invalidateQueries({ queryKey: ["events"] });
        queryClient.invalidateQueries({ queryKey: ["event", event._id] });

        // Handle toast notifications
        if (!socketMessage.toastNotification) return;
        Toast.show({
          type: "info",
          text1: socketMessage.toastNotification.title,
          text2: socketMessage.toastNotification.body,
          onPress: () => {
            bottomSheetStore.open("EVENT", { event });
            navigation.navigate("Main", {
              screen: "MoreTab",
              params: {
                screen: "Events",
              },
            });
          },
        });
        break;
      }

      case "NEW_FORM_RESPONSE": {
        const form = socketMessage.data.payload.form;
        const pnmId = socketMessage.data.payload.response.pnm._id;
        queryClient.invalidateQueries({ queryKey: ["forms"] });
        queryClient.invalidateQueries({ queryKey: ["form", form._id] });
        queryClient.invalidateQueries({ queryKey: ["pnmResponses", pnmId] });

        // Handle toast notifications
        if (!socketMessage.toastNotification) return;
        Toast.show({
          type: "info",
          text1: socketMessage.toastNotification.title,
          text2: socketMessage.toastNotification.body,
          onPress: () => {
            bottomSheetStore.open("FORM_RESPONSES", { form });
            navigation.navigate("Main", {
              screen: "MoreTab",
              params: {
                screen: "Forms",
              },
            });
          },
        });
      }
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
