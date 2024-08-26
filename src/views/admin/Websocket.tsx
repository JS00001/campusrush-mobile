/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import { formatJSON } from "@/lib/util/string";
import { useWebsocket } from "@/providers/websocket";

const WebsocketView = () => {
  const websocket = useWebsocket();

  const onReconnect = () => {
    websocket.connect();
  };

  if (!Object.keys(websocket).length) {
    return (
      <View style={tw`gap-y-1 items-center`}>
        <Icon name="alert-fill" size={36} color={tw.color("yellow")} />
        <Headline
          centerText
          title="No Websocket Provider Found"
          subtitle="Websocket provider is only available when logged in"
        />
      </View>
    );
  }

  return (
    <View style={tw`gap-y-2 w-full`}>
      <Button onPress={onReconnect} iconLeft="refresh-line">
        Reconnect Websocket
      </Button>

      <View style={tw`rounded-xl bg-slate-100 p-4`}>
        <Headline
          title="Websocket Connected?"
          subtitle={websocket.connected ? "Yes, Connected" : "No"}
          subtitleStyle={websocket.connected ? tw`text-green` : tw`text-red`}
        />
      </View>

      <View style={tw`rounded-xl bg-slate-100 p-4 gap-y-2`}>
        <Text type="h2">Messages</Text>

        {websocket.logs.length === 0 && (
          <Text>
            No messages yet. Receive a websocket message to see it here.
          </Text>
        )}

        {websocket.logs.map((message, index) => {
          // Format the message.timestamp as MMM DD, YYYY
          const date = new Date(message.timestamp);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          const timeboxStyles = tw.style(
            "flex-row items-center gap-2",
            "p-2 rounded-md bg-slate-200",
          );

          return (
            <View key={index} style={timeboxStyles}>
              <View>
                <Text type="p4" style={tw`text-primary`}>
                  {formattedDate}
                </Text>
                <Text type="p4">{formattedTime}</Text>
              </View>

              <Text type="p3" style={tw`flex-1`}>
                {formatJSON(message.message)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WebsocketView;
