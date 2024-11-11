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

import {
  View,
  Keyboard,
  TextInput as RNTextInput,
  ScrollView,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRef, useState } from "react";

import type {
  IAttachments,
  ExtensionPanelRef,
  IMessageContent,
} from "@/@types/message-box";

import TextInput from "./TextInput";
import ExtensionPanel from "./ExtensionPanel";
import TextSuggestions from "./TextSuggestions";
import ImageLoading from "./ExtensionPanel/Extensions/Image/Loading";
import ImageAttachment from "./ExtensionPanel/Extensions/Image/Attachment";
import EventAttachment from "./ExtensionPanel/Extensions/Event/Attachment";

import tw from "@/lib/tailwind";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface MessageBoxProps {
  massMessage: boolean;
  disableSend?: boolean;
  onSend: (messages: IMessageContent[]) => Promise<{ cancelled: boolean }>;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  massMessage,
  disableSend,
  onSend,
}) => {
  const textInputRef = useRef<RNTextInput>(null);
  const extensionPanelRef = useRef<ExtensionPanelRef>(null);

  const inputMarginBottom = useSharedValue(0);
  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const [value, setValue] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState(0);
  const [extensionsVisible, _setExtensionsVisible] = useState(false);
  const [attachments, setAttachments] = useState<IAttachments>({
    images: [],
    events: [],
  });

  const hasAttachments =
    !!attachments.events.length || !!attachments.images.length;

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
  const onSendPress = async () => {
    // If the value is empty, set the content to undefined, so that we just send
    // the attachments
    const content = value || undefined;
    const events = attachments.events.map((event) => ({
      content: event,
      attachments: [],
    }));

    // If there are events, add them as separate messages, then remove
    // all messages that have niether content nor attachments
    const messages = [
      { content, attachments: attachments.images },
      ...events,
    ].filter((message) => message.content || message.attachments.length);

    if (!messages.length) return;

    // TODO: Remove the 'if !mass message' check
    if (!massMessage) {
      onSend(messages);
      setValue("");
      setAttachments({ images: [], events: [] });
      return;
    }

    // Send the message. If the user gets a dialog, and cancels, we don't want to clear
    // the message, they could try again
    const { cancelled } = await onSend(messages);

    if (!cancelled) {
      setValue("");
      setAttachments({ images: [], events: [] });
    }
  };

  /**
   * Remove the current event
   */
  const removeEvent = () => {
    setAttachments((attachments) => ({
      ...attachments,
      events: [],
    }));
  };

  /**
   * Remove an image attachment
   */
  const removeImage = (image: string) => {
    setAttachments((attachments) => ({
      ...attachments,
      images: attachments.images.filter((img) => img !== image),
    }));
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
    "px-3 py-2 border-t items-start",
    "border-gray-100",
    !!(hasAttachments || pendingAttachments) && "gap-y-2.5",
  );

  const inputContainerClasses = tw.style("flex-row gap-1 items-center");

  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = (!value.length && !hasAttachments) || disableSend;

  return (
    <>
      <TextSuggestions
        value={value}
        setValue={setValue}
        suggestions={AppConstants.messagingKeywords}
      />

      <ExtensionPanel
        ref={extensionPanelRef}
        attachments={attachments}
        pendingAttachments={pendingAttachments}
        setVisible={setExtensionsVisible}
        setAttachments={setAttachments}
        setPendingAttachments={setPendingAttachments}
      />

      <Walkthroughs.MessageBoxWalkthrough
        isVisible={!messagingTooltipSeen}
        onClose={onWalkthroughClose}
      >
        <Animated.View style={[containerClasses, animatedInputStyle]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`overflow-visible`}
            contentContainerStyle={tw`flex-row gap-2`}
          >
            {attachments.events.map((event) => (
              <EventAttachment
                key={event}
                event={event}
                onRemove={removeEvent}
              />
            ))}

            {attachments.images.map((image) => (
              <ImageAttachment
                key={image}
                image={image}
                onRemove={removeImage}
              />
            ))}

            {new Array(pendingAttachments).fill(null).map((_, index) => (
              <ImageLoading key={index} />
            ))}
          </ScrollView>

          <View style={inputContainerClasses}>
            <IconButton
              ph-label="show-extensions"
              size="sm"
              color="secondary"
              iconName={extensionsVisible ? "X" : "Plus"}
              // prettier-ignore
              iconColor={ extensionsVisible ? tw.color("red-500") : tw.color("primary")}
              onPress={onExtensionsPress}
            />

            <TextInput
              ph-label="message-box"
              passedRef={textInputRef}
              value={value}
              setValue={setValue}
              placeholder="Send a message"
            />

            <IconButton
              ph-label="send-message"
              size="sm"
              color="secondary"
              iconName="PaperPlaneRight"
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
