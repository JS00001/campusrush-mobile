/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import TagSelector from "@/components/TagSelector";
import TagView from "@/components/TagView";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import ListItemLoader from "@/ui/Loaders/ListItem";
import Switch from "@/ui/Switch";
import ToggleChip from "@/ui/ToggleChip";
import WebsitePreview from "@/ui/WebsitePreview";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

interface UITestingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITestingScreen: React.FC<UITestingScreenProps> = ({ navigation }) => {
  const [value, setValue] = useState(false);

  const onChange = (values: string[]) => {};

  return (
    <Layout.Root>
      <Layout.Content scrollable>
        <TagView
          disabled
          onPress={() => {
            console.log("TagView Pressed");
          }}
          tags={["tag1", "tag2", "tag3", "Sports", "Testing"]}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITestingScreen;
