/*
 * Created on Sat Oct 21 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import ChatHeader from "@/components/ChatHeader";

interface UpdatePnmDetailsProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const UpdatePnmDetails: React.FC<UpdatePnmDetailsProps> = ({
  navigation,
  route,
}) => {
  // The PNM to update
  const pnm = route.params.pnm as PNM;
  // The field of the pnm that we are updating
  const field = route.params.field as keyof PNM;
  // The value of the field
  const [value, setValue] = useState<string>((pnm[field] as string) || "");

  // Whether or not the changes can be saved (has the value changed)
  const isButtonDisabled = value === pnm[field];
  // The placeholder for the text input is the field properly capitalized and spaced (they are camel cased in the PNM type)
  const placeholder = field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  // When the button is pressed, update the pnm
  const onPress = () => {};

  // If there is no pnm or field, go back as we cannot update details
  if (!pnm || !field) {
    navigation.goBack();
  }

  return (
    <Layout gap={8}>
      <Layout.CustomHeader>
        <ChatHeader pnms={[pnm]} />
      </Layout.CustomHeader>

      <TextInput
        value={value}
        onChangeText={setValue}
        // convert field to capitalized string
        placeholder={placeholder}
      />

      <Button disabled={isButtonDisabled}>Save Changes</Button>
    </Layout>
  );
};

export default UpdatePnmDetails;
