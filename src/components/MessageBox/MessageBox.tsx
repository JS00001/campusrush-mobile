/*
 * Created on Thu Oct 5 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useRef, useState } from "react";
import { View, Keyboard, TextInput as RNTextInput } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

import TextInput from "./TextInput";
import ExtensionPanel from "./ExtensionPanel";
import TextSuggestions from "./TextSuggestions";

import Event from "@/ui_v1/Event";
import tw from "@/lib/tailwind";
import { waitFor } from "@/lib/util";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import Content from "@/constants/content";
import { eventsRegex } from "@/constants/regex";
import { formatEvent } from "@/lib/util/format";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";

interface MessageBoxProps {
  disableSend?: boolean;
  onSend: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ disableSend, onSend }) => {
  const minHeight = useSharedValue(0);

  const [value, setValue] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [extensionsVisible, setExtensionsVisible] = useState<boolean>(false);

  const textInputRef = useRef<RNTextInput>(null);
  const extensionPanelRef = useRef<ExtensionPanelRef>(null);

  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const onExtensionsPress = async () => {
    // If we are closing the extension panel...
    if (extensionsVisible) {
      animateMessageBox(0);
      extensionPanelRef.current?.closePanel();
      return;
    }

    // If we are opening the extensions panel
    else {
      if (textInputRef.current?.isFocused()) {
        const KEYBOARD_ANIMATION_DURATION = 250; // How long the ios keyboard takes to animate down

        Keyboard.dismiss();
        await waitFor(KEYBOARD_ANIMATION_DURATION);
      }

      const ANIMATION_DURATION = 200;

      animateMessageBox(1, ANIMATION_DURATION);
      await waitFor(ANIMATION_DURATION);

      extensionPanelRef.current?.openPanel();
    }
  };

  const animateMessageBox = (toValue: number, duration?: number) => {
    const BOTTOM_SHEET_HEIGHT = 240;

    const adjustedValue = toValue * BOTTOM_SHEET_HEIGHT;

    minHeight.value = withTiming(adjustedValue, {
      duration: duration || 300,
    });
  };

  // When the send button is pressed, send the message and clear the input
  const onSendPress = () => {
    let message = value;

    // If an event is attached, add it to the message
    if (event) {
      const formattedEvent = formatEvent(event);

      // prettier-ignore
      const eventMessage = Content.eventInvitation
        .replace('{{title}}', formattedEvent.title)
        .replace('{{location}}', formattedEvent.location)
        .replace('{{date}}', `${formattedEvent.dateString}`)
        .replace('{{time}}', `${formattedEvent.start.time} - ${formattedEvent.end.time}`)
        .replace('{{link}}',  `${AppConstants.eventUrl}/${event._id}`)

      // If there is a message, we want to separate the event message from the message
      const newLine = message ? "\n\n" : "";

      message = eventMessage + newLine + message;
    }

    onSend(message);
    setValue("");
    setEvent(null);
  };

  const removeEvent = () => {
    setValue(value.replace(eventsRegex, ""));
    setEvent(null);
  };

  const onWalkthroughClose = () => {
    updatePreferences({ messagingTooltipSeen: true });
  };

  const containerClasses = tw.style(
    "gap-2.5 px-3 py-2 border-t border-b items-start",
    "border-slate-100 ",
  );

  const inputContainerClasses = tw.style("flex-row gap-1 items-center");

  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = (!value.length && event == null) || disableSend;

  return (
    <Walkthroughs.MessageBoxWalkthrough
      isVisible={!messagingTooltipSeen}
      onClose={onWalkthroughClose}
    >
      <TextSuggestions
        value={value}
        setValue={setValue}
        suggestions={AppConstants.messagingKeywords}
      />

      <Animated.View style={[containerClasses, { marginBottom: minHeight }]}>
        {event && (
          <Event type="attachment" event={event} onPress={removeEvent} />
        )}

        <View style={inputContainerClasses}>
          <IconButton
            size="sm"
            color="secondary"
            iconName={extensionsVisible ? "close-line" : "add-fill"}
            // prettier-ignore
            iconColor={ extensionsVisible ? tw.color("red") : tw.color("primary")}
            onPress={onExtensionsPress}
          />

          <TextInput
            passedRef={textInputRef}
            placeholder="Send a message"
            value={value}
            setValue={setValue}
          />
          <IconButton
            size="sm"
            color="secondary"
            iconName="send-plane-2-fill"
            disabled={isButtonDisabled}
            onPress={onSendPress}
          />
        </View>
      </Animated.View>

      <ExtensionPanel
        ref={extensionPanelRef}
        visible={extensionsVisible}
        setEvent={setEvent}
        setVisible={setExtensionsVisible}
        animateMessageBox={animateMessageBox}
      />
    </Walkthroughs.MessageBoxWalkthrough>
  );
};

export default MessageBox;
