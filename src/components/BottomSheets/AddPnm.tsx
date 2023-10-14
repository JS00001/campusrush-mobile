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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View, ScrollView } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";
import TextInput from "@/ui/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "@/ui/Button";

enum AddPnmScreens {
  AddPnm = "ADD_PNM",
  AddManual = "ADD_MANUAL",
  AddQrCode = "ADD_QR_CODE",
}

type ScreensList = Record<
  AddPnmScreens,
  { position: string; component: JSX.Element }
>;

interface AddPnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToPosition: (position: string) => void;
}

const AddPnm: React.FC<AddPnmProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  const navigation = useNavigation();

  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["55%", "75%", "95%"], []);
  const [_screen, _setScreen] = useState<AddPnmScreens>(AddPnmScreens.AddPnm);

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (!(index >= 0)) {
      setScreen(AddPnmScreens.AddPnm);
    }
  };

  // Method to set the screen to a new step
  const setScreen = (screen: AddPnmScreens) => {
    // Set the screen
    _setScreen(screen);
    // and then snap to the new position
    handleSnapToPosition(ScreensList[screen].position);
  };

  // Create a list of all of the screens
  const ScreensList: ScreensList = {
    [AddPnmScreens.AddPnm]: {
      position: "55%",
      component: (
        <AddPnmStep
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManual]: {
      position: "95%",
      component: (
        <AddManualStep
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddQrCode]: {
      position: "80%",
      component: (
        <AddQrCodeStep
          setScreen={setScreen}
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

interface AddPnmScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddPnmStep: React.FC<AddPnmScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  const onAddPnmManuallyPress = () => {
    setScreen(AddPnmScreens.AddManual);
  };

  const onAddPnmQrCodePress = () => {
    setScreen(AddPnmScreens.AddQrCode);
  };

  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-2`}>
      <View>
        <Text variant="title">Add a PNM</Text>
        <Text variant="body">
          Add a PNM to your chapter to keep track of their rush.
        </Text>
      </View>

      <ActionCard
        title="Add PNM Manually"
        subtitle="Add a PNMs info manually"
        icon="ri-user-voice-fill"
        onPress={onAddPnmManuallyPress}
      />
      <ActionCard
        title="Add PNM from Contacts"
        subtitle="Add a PNM from your contacts"
        icon="ri-contacts-fill"
        onPress={() => console.log("Add PNM from Contacts")}
      />
      <ActionCard
        title="Display QR Code"
        subtitle="Have a PNM scan a QR code"
        icon="ri-qr-code-fill"
        onPress={onAddPnmQrCodePress}
      />
    </ScrollView>
  );
};

interface AddManualScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddManualStep: React.FC<AddManualScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Add PNM Manually</Text>
        <Text variant="body">Add a PNM to your chapter</Text>
      </View>

      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Phone Number" />
      <TextInput placeholder="Instagram" />
      <TextInput placeholder="Snapchat" />
      <TextInput placeholder="Classification" />
      <Button size="sm" iconRight="ri-arrow-right-line">
        Add PNM
      </Button>
    </KeyboardAwareScrollView>
  );
};

interface AddQrCodeScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddQrCodeStep: React.FC<AddQrCodeScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-4`}>
      <View>
        <Text variant="title">Display QR Code</Text>
        <Text variant="body">Have a PNM scan a QR code</Text>
      </View>
    </ScrollView>
  );
};

export default AddPnm;
