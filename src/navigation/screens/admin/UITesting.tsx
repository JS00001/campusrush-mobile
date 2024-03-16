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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Layout } from "@/ui/Layout";
import ListItem from "@/ui/ListItem";
import TextInput from "@/ui/TextInput";
import useSearch from "@/hooks/useSearch";
import UIComponents from "@/constants/uiComponents";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const search = useSearch({
    data: UIComponents,
    fields: ["name"],
  });

  const onPress = (screen: string) => {
    navigation.navigate(screen);
  };

  const placeholder = `Search ${UIComponents.length} components...`;

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="UI Components"
        subtitle="All of the current UI components and their docs are below"
      />

      <Layout.Content scrollable gap={12}>
        <TextInput
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
        />

        {search.data.map((component, index) => (
          <ListItem
            key={index}
            size="md"
            title={component.name}
            subtitle={component.description}
            onPress={() => onPress(component.screenName)}
          />
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITesting;
