/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import ActionCard from "@/ui/ActionCard";
import RecentPnms from "@/components/RecentPnms";
import useContacts from "@/hooks/messaging/useContacts";

enum NewMessageScreens {
  NewMessage = "NEW_MESSAGE",
  DirectMessage = "DIRECT_MESSAGE",
}

type ScreensList = Record<
  NewMessageScreens,
  { position: string; component: JSX.Element }
>;

interface NewMessageProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToPosition: (position: string) => void;
}

const NewMessage: React.FC<NewMessageProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Custom hook to get contacts
  const { refetch } = useContacts();
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["65%", "80%", "95%"], []);
  // State to keep track of which screen the user is on
  const [_screen, _setScreen] = useState<NewMessageScreens>(
    NewMessageScreens.NewMessage,
  );

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (index >= 0) {
      // Refetch the contacts
      refetch();
    }
    // // If the bottom sheet modal is closed
    else {
      // Reset the screen
      setScreen(NewMessageScreens.NewMessage);
    }
  };

  // Method to set the screen to a new step
  const setScreen = (screen: NewMessageScreens) => {
    // Set the screen
    _setScreen(screen);
    // and then snap to the new position
    handleSnapToPosition(ScreensList[screen].position);
  };

  // Create a list of all of the screens
  const ScreensList: ScreensList = {
    [NewMessageScreens.NewMessage]: {
      position: "65%",
      component: (
        <NewMessageStep
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [NewMessageScreens.DirectMessage]: {
      position: "80%",
      component: (
        <DirectMessageStep
          setScreen={setScreen}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
  };

  // Select the proper screen
  const ScreenComponent = ScreensList[_screen].component;

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      snapPoints={snapPoints}
      onChange={onBottomSheetChange}
      backdropComponent={() => (
        <Pressable
          style={tw`h-full w-full absolute bg-black opacity-20`}
          onPress={handleCloseModalPress}
        />
      )}
    >
      {ScreenComponent}
    </BottomSheetModal>
  );
};

/**
 * The "New Message" screen, this is the first screen in the modal flow
 */
interface NewMessageScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: NewMessageScreens) => void;
}

const NewMessageStep: React.FC<NewMessageScreenProps> = ({
  handleCloseModalPress,
  setScreen,
}) => {
  // Navigation hook to navigate to new message screen
  const navigation = useNavigation();
  // Custom hook to get contacts
  const { isLoading, uncontactedPnms, allPnms } = useContacts();

  // When the user presses the direct message button
  const onMessagePress = () => {
    setScreen(NewMessageScreens.DirectMessage);
  };

  // When the user presses the message all button
  const onMessageAllPress = () => {
    // If there are no PNMs, show an error toast
    if (allPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have no PNMs to message",
      });
      // and close the bottom sheet modal
      handleCloseModalPress();
      return;
    }

    // Otherwise, close the bottom sheet modal
    handleCloseModalPress();

    // and pass the PNMs to the new message screen
    (navigation.navigate as any)("NewMessage", {
      pnms: allPnms,
    });
  };

  // When the user presses the message new members button
  const onMessageNewMembersPress = () => {
    // If there are no uncontacted PNMs, show an error toast
    if (uncontactedPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have sent messages to all PNMs",
      });
      // and close the bottom sheet modal
      handleCloseModalPress();
      return;
    }

    // Otherwise, close the bottom sheet modal
    handleCloseModalPress();

    // and pass the PNMs to the new message screen
    (navigation.navigate as any)("NewMessage", {
      pnms: uncontactedPnms,
    });
  };

  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-4`}>
      <View>
        <Text variant="title">New Message</Text>
        <Text variant="body">Start a new message with potential members</Text>
      </View>
      <ActionCard
        title="Message All"
        subtitle="Send a message to all PNMs"
        icon="ri-chat-voice-fill"
        loading={isLoading}
        onPress={onMessageAllPress}
      />
      <ActionCard
        title="Direct Message"
        subtitle="Start a message with a single user"
        icon="ri-chat-private-fill"
        loading={isLoading}
        onPress={onMessagePress}
      />
      <ActionCard
        title="Message New Members"
        subtitle="Send a message to all PNMs you have not contacted"
        icon="ri-chat-history-fill"
        loading={isLoading}
        onPress={onMessageNewMembersPress}
      />
    </ScrollView>
  );
};

/**
 * The "Send to user" screen, this is the only other screen in the modal flow
 * and is opened when the user presses the "Direct Message" button
 */
interface DirectMessageScreenProps {
  handleCloseModalPress?: () => void;
  handleSnapToPosition?: (position: string) => void;
  setScreen?: (screen: NewMessageScreens) => void;
}

const DirectMessageStep: React.FC<DirectMessageScreenProps> = ({
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Navigation hook to navigate to new message screen
  const navigation = useNavigation();
  // Custom hook to get contacts
  const {
    searchQuery,
    isLoading,
    filteredPnms,
    directMessageHeader,
    setSearchQuery,
  } = useContacts();

  const onPnmPress = (pnm: PNM) => {
    // Close the bottom sheet modal
    handleCloseModalPress?.();
    // and navigate to the new message screen
    (navigation.navigate as any)("Chat", {
      pnm: pnm,
    });
  };

  return (
    <View style={tw`px-6 pt-6 gap-y-6 flex-1 `}>
      <View>
        <Text variant="title">Begin Typing</Text>
        <Text variant="body">Search for a PNM to message</Text>
      </View>

      <TextInput
        autoCorrect={false}
        icon="ri-search-line"
        variant="alternate"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => {
          handleSnapToPosition?.("95%");
        }}
      />

      <View style={tw`gap-y-3 flex-1`}>
        <Text variant="body">{directMessageHeader}</Text>
        <RecentPnms
          pnms={filteredPnms}
          loading={isLoading}
          onPress={onPnmPress}
        />
      </View>
    </View>
  );
};

export default NewMessage;
