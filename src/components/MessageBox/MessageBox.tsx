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

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRef, useState } from "react";
import { View, Keyboard, TextInput as RNTextInput } from "react-native";

import TextInput from "./TextInput";
import ExtensionPanel from "./ExtensionPanel";
import TextSuggestions from "./TextSuggestions";
import EventAttachment from "./ExtensionPanel/Extensions/Event/Attachment";

import tw from "@/lib/tailwind";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import { eventsRegex } from "@/constants/regex";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface MessageBoxProps {
  disableSend?: boolean;
  onSend: (messages: string[]) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ disableSend, onSend }) => {
  const marginBottom = useSharedValue(0);
  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const [value, setValue] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [extensionsVisible, setExtensionsVisible] = useState<boolean>(false);

  const textInputRef = useRef<RNTextInput>(null);
  const extensionPanelRef = useRef<ExtensionPanelRef>(null);

  useKeyboardListener({
    onKeyboardWillShow: (e) => {
      const keyboardHeight = e.endCoordinates.height;
      extensionPanelRef.current?.closePanel();
      animateMessageBox(1, keyboardHeight);
    },
    onKeyboardWillHide: () => {
      if (extensionsVisible) return;
      animateMessageBox(0);
    },
  });

  const onExtensionsPress = async () => {
    // If we are closing the extension panel...
    if (extensionsVisible) {
      animateMessageBox(0);
      extensionPanelRef.current?.closePanel();
      return;
    }

    // If we are opening the extensions panel
    else {
      extensionPanelRef.current?.openPanel();
      Keyboard.dismiss();
      animateMessageBox(1);
    }
  };

  const animateMessageBox = (toValue: number, height?: number) => {
    const IOS_KEYBOARD_ANIMATION_DURATION = 250;
    const IOS_KEYBOARD_EASING = Easing.bezier(0.33, 1, 0.68, 1);
    const BOTTOM_SHEET_HEIGHT = height ? height - 30 : 306;

    const adjustedValue = toValue * BOTTOM_SHEET_HEIGHT;

    marginBottom.value = withTiming(adjustedValue, {
      duration: IOS_KEYBOARD_ANIMATION_DURATION,
      easing: IOS_KEYBOARD_EASING,
    });
  };

  const onSendPress = () => {
    let messages = [value];

    // If an event is attached, add it to the message
    if (event) {
      messages = [`${AppConstants.eventUrl}/${event._id}`, ...messages];
    }

    // Check if any entries in the array are empty, if so, remove them, if all are empty, return
    messages = messages.filter((message) => message.length);

    if (!messages.length) return;

    onSend(messages);
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

  const animatedMarginStyle = useAnimatedStyle(() => {
    return {
      marginBottom: marginBottom.value,
    };
  });

  const containerClasses = tw.style(
    "gap-2.5 px-3 py-2 border-t items-start",
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

      <ExtensionPanel
        ref={extensionPanelRef}
        visible={extensionsVisible}
        setEvent={setEvent}
        setVisible={setExtensionsVisible}
      />

      <Animated.View style={[containerClasses, animatedMarginStyle]}>
        {event && <EventAttachment event={event} onPress={removeEvent} />}

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
    </Walkthroughs.MessageBoxWalkthrough>
  );
};

export default MessageBox;
