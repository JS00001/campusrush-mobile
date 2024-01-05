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

import TextInput from "./TextInput";
import ExtensionPanel from "./ExtensionPanel";
import TextSuggestions from "./TextSuggestions";

import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import { waitFor } from "@/lib/util";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import Content from "@/constants/content";
import { EVENT_URL } from "@/api/constants";
import { eventsRegex } from "@/constants/regex";
import { formatEvent } from "@/lib/util/format";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";

interface MessageBoxProps {
  disableSend?: boolean;
  onSend: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ disableSend, onSend }) => {
  const textInputRef = useRef<RNTextInput>(null);
  const extensionPanelRef = useRef<ExtensionPanelRef>(null);

  const [value, setValue] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [extensionsVisible, setExtensionsVisible] = useState<boolean>(false);

  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const onExtensionsPress = async () => {
    // If we are closing the extensions
    if (extensionsVisible) {
      extensionPanelRef.current?.closeContainer(() => {
        textInputRef.current?.focus();
      });
      return;
    }

    // If we are opening the extensions panel
    else {
      if (textInputRef.current?.isFocused()) {
        const KEYBOARD_ANIMATION_DURATION = 250; // How long the ios keyboard takes to animate down

        Keyboard.dismiss();
        await waitFor(KEYBOARD_ANIMATION_DURATION);
      }

      extensionPanelRef.current?.openContainer();
    }
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
        .replace('{{link}}',  `${EVENT_URL}/${event._id}`)

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
    "gap-2.5 px-3 py-3 border-t border-b items-start",
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

      <View style={containerClasses}>
        {event && (
          <Event type="attachment" event={event} onPress={removeEvent} />
        )}

        <View style={inputContainerClasses}>
          <IconButton
            size="md"
            icon={extensionsVisible ? "ri-close-line" : "ri-add-fill"}
            onPress={onExtensionsPress}
            color={
              extensionsVisible ? tw.color("red-500") : tw.color("primary")
            }
          />

          <TextInput
            passedRef={textInputRef}
            placeholder="Send a message"
            value={value}
            setValue={setValue}
          />
          <IconButton
            size="md"
            icon="ri-send-plane-2-fill"
            disabled={isButtonDisabled}
            onPress={onSendPress}
          />
        </View>
      </View>

      <ExtensionPanel
        ref={extensionPanelRef}
        visible={extensionsVisible}
        setEvent={setEvent}
        setVisible={setExtensionsVisible}
      />
    </Walkthroughs.MessageBoxWalkthrough>
  );
};

export default MessageBox;
