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

import tw from "@/lib/tailwind";
import { waitFor } from "@/lib/util";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
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
  const [isEventsVisible, setIsEventsVisible] = useState(false);

  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const onEventsPress = async () => {
    // If we are closing the events panel...
    if (isEventsVisible) {
      extensionPanelRef.current?.closeContainer(() => {
        textInputRef.current?.focus();
      });
      return;
    }

    // If we are opening the events panel...
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
    onSend(value);
    setValue("");
  };

  // When the walkthrough is closed, update the preferences
  const onWalkthroughClose = () => {
    updatePreferences({ messagingTooltipSeen: true });
  };

  const containerClasses = tw.style(
    "flex-row gap-1 px-3 py-2 border-t items-center",
    "border-slate-100 ",
  );

  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = !value.length || disableSend;

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
        <IconButton
          size="md"
          icon={isEventsVisible ? "ri-close-line" : "ri-calendar-event-line"}
          onPress={onEventsPress}
          color={isEventsVisible ? tw.color("red-500") : tw.color("primary")}
        />

        <TextInput
          passedRef={textInputRef}
          placeholder="Send a message"
          value={value}
          setValue={setValue}
        />
        <IconButton
          size="md"
          icon="ri-send-plane-2-line"
          disabled={isButtonDisabled}
          onPress={onSendPress}
        />
      </View>

      <ExtensionPanel
        ref={extensionPanelRef}
        visible={isEventsVisible}
        setVisible={setIsEventsVisible}
      />
    </Walkthroughs.MessageBoxWalkthrough>
  );
};

export default MessageBox;
