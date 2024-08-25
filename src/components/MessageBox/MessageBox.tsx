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

import type { Event } from "@/types";
import type { ExtensionPanelRef } from "@/types/messageBox";

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
  const textInputRef = useRef<RNTextInput>(null);
  const extensionPanelRef = useRef<ExtensionPanelRef>(null);

  const inputMarginBottom = useSharedValue(0);
  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const [value, setValue] = useState<string>("");
  const [attachment, setAttachment] = useState<Event | null>(null);
  const [extensionsVisible, _setExtensionsVisible] = useState<boolean>(false);

  /**
   * Adjust the margin of the message box based on the
   * keyboards events
   */
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

  /**
   * Toggle the extensions panel, and the height
   * of the message box
   */
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

  /**
   * Set the visibility of the extensions panel
   */
  const setExtensionsVisible = (visible: boolean) => {
    const messageBoxPosition = visible ? 1 : 0;

    _setExtensionsVisible(visible);
    animateMessageBox(messageBoxPosition);
  };

  /**
   * Animate the message box to the top (1) or bottom (0)
   * this simulates keyboard avoiding behavior, and the bottom sheet
   * pushing it
   */
  const animateMessageBox = (toValue: number, height?: number) => {
    const IOS_KEYBOARD_ANIMATION_DURATION = 250;
    const IOS_KEYBOARD_EASING = Easing.bezier(0.33, 1, 0.68, 1);
    const BOTTOM_SHEET_HEIGHT = height ? height - 30 : 306;

    const adjustedValue = toValue * BOTTOM_SHEET_HEIGHT;

    inputMarginBottom.value = withTiming(adjustedValue, {
      duration: IOS_KEYBOARD_ANIMATION_DURATION,
      easing: IOS_KEYBOARD_EASING,
    });
  };

  /**
   * Send the message/attachment and reset the state
   */
  const onSendPress = () => {
    let messages = [value];

    // If an attachment is attached, add it to the message
    if (attachment) {
      messages = [`${AppConstants.eventUrl}/${attachment._id}`, ...messages];
    }

    // Check if any entries in the array are empty, if so, remove them, if all are empty, return
    messages = messages.filter((message) => message.length);

    if (!messages.length) return;

    onSend(messages);
    setValue("");
    setAttachment(null);
  };

  /**
   * Remove the current attachment
   */
  const removeAttachment = () => {
    setValue(value.replace(eventsRegex, ""));
    setAttachment(null);
  };

  /**
   * When the walkthrough is completed, set the user
   * preference to not show it again
   */
  const onWalkthroughClose = () => {
    updatePreferences({ messagingTooltipSeen: true });
  };

  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      marginBottom: inputMarginBottom.value,
    };
  });

  const containerClasses = tw.style(
    "gap-2.5 px-3 py-2 border-t items-start",
    "border-slate-100 ",
  );

  const inputContainerClasses = tw.style("flex-row gap-1 items-center");

  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = (!value.length && attachment == null) || disableSend;

  return (
    <>
      <TextSuggestions
        value={value}
        setValue={setValue}
        suggestions={AppConstants.messagingKeywords}
      />

      <ExtensionPanel
        ref={extensionPanelRef}
        visible={extensionsVisible}
        setAttachment={setAttachment}
        setVisible={setExtensionsVisible}
      />

      <Walkthroughs.MessageBoxWalkthrough
        isVisible={!messagingTooltipSeen}
        onClose={onWalkthroughClose}
      >
        <Animated.View style={[containerClasses, animatedInputStyle]}>
          {attachment && (
            <EventAttachment event={attachment} onPress={removeAttachment} />
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
      </Walkthroughs.MessageBoxWalkthrough>
    </>
  );
};

export default MessageBox;
