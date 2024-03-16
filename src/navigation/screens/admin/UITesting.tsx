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

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const onPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="UI Components"
        subtitle="All of the current UI components and their docs are below"
      />

      <Layout.Content scrollable gap={12}>
        <ListItem
          size="md"
          title="Action Button"
          subtitle="A floating button with an icon"
          onPress={() => onPress("UIActionButton")}
        />
        <ListItem
          size="md"
          title="Badge"
          subtitle="A small status indicator"
          onPress={() => onPress("UIBadge")}
        />
        <ListItem
          size="md"
          title="Button"
          subtitle="Clickable text or icon"
          onPress={() => onPress("UIButton")}
        />
        <ListItem
          size="md"
          title="Button Group"
          subtitle="A set of radio buttons or toggle buttons"
          onPress={() => onPress("UIBtnGroup")}
        />
        <ListItem
          size="md"
          title="Chapter"
          subtitle="A section within content hierarchy"
          onPress={() => onPress("UIChapter")}
        />
        <ListItem
          size="md"
          title="Conversation"
          subtitle="List of messages between users"
          onPress={() => onPress("UIConversation")}
        />
        <ListItem
          size="md"
          title="Copy Action"
          subtitle="Button to copy text to clipboard"
          onPress={() => onPress("UICopyAction")}
        />
        <ListItem
          size="md"
          title="Copy View"
          subtitle="Displays copied text for easy reference"
          onPress={() => onPress("UICopyView")}
        />
        <ListItem
          size="md"
          title="Date Time Picker"
          subtitle="Component to select date and time"
          onPress={() => onPress("UIDateTimePicker")}
        />
        <ListItem
          size="md"
          title="Detail View"
          subtitle="Detailed information about an item"
          onPress={() => onPress("UIDetailView")}
        />
        <ListItem
          size="md"
          title="Event"
          subtitle="A scheduled occurrence or notification"
          onPress={() => onPress("UIEvent")}
        />
        <ListItem
          size="md"
          title="Form Field"
          subtitle="Input field for user data"
          onPress={() => onPress("UIFormField")}
        />
        <ListItem
          size="md"
          title="Headline"
          subtitle="Main heading of a content section"
          onPress={() => onPress("UIHeadline")}
        />
        <ListItem
          size="md"
          title="Hyperlink"
          subtitle="Clickable text leading to another screen or action"
          onPress={() => onPress("UIHyperlink")}
        />
        <ListItem
          size="md"
          title="Icon"
          subtitle="Bootstrap icons"
          onPress={() => onPress("UIIcon")}
        />
        <ListItem
          size="md"
          title="Icon Button"
          subtitle="Button with an integrated icon"
          onPress={() => onPress("UIIconButton")}
        />
        <ListItem
          size="md"
          title="Icon Label"
          subtitle="Combination of an icon and text label"
          onPress={() => onPress("UIIconLabel")}
        />
        <ListItem
          size="md"
          title="Information"
          subtitle="Displays informational content"
          onPress={() => onPress("UIInformation")}
        />
        <ListItem
          size="md"
          title="List Item"
          subtitle="An item within a list"
          onPress={() => onPress("UIListItem")}
        />
        <ListItem
          size="md"
          title="Menu"
          subtitle="A list of options for user interaction"
          onPress={() => onPress("UIMenu")}
        />
        <ListItem
          size="md"
          title="Message Bubble"
          subtitle="A container for a message in a conversation"
          onPress={() => onPress("UIMessageBubble")}
        />
        <ListItem
          size="md"
          title="Modal"
          subtitle="A temporary overlay on top of the screen"
          onPress={() => onPress("UIModal")}
        />
        <ListItem
          size="md"
          title="Progress"
          subtitle="Shows the progress of an operation"
          onPress={() => onPress("UIProgress")}
        />
        <ListItem
          size="md"
          title="Segmented Control"
          subtitle="A set of mutually exclusive buttons"
          onPress={() => onPress("UISegmentedControl")}
        />
        <ListItem
          size="md"
          title="Select"
          subtitle="Dropdown menu for selecting options"
          onPress={() => onPress("UISelect")}
        />

        <ListItem
          size="md"
          title="Selection Card"
          subtitle="A card representing a selectable option"
          onPress={() => onPress("UISelectionCard")}
        />
        <ListItem
          size="md"
          title="Skeleton"
          subtitle="Placeholder content for loading states"
          onPress={() => onPress("UISkeleton")}
        />
        <ListItem
          size="md"
          title="Swipeable"
          subtitle="An item that can be swiped to reveal actions"
          onPress={() => onPress("UISwipeable")}
        />
        <ListItem
          size="md"
          title="Tabs"
          subtitle="Navigation between different content sections"
          onPress={() => onPress("UITabs")}
        />
        <ListItem
          size="md"
          title="Text"
          subtitle="Plain text content"
          onPress={() => onPress("UIText")}
        />
        <ListItem
          size="md"
          title="Text Input"
          subtitle="Field for user to enter text"
          onPress={() => onPress("UITextInput")}
        />
        <ListItem
          size="md"
          title="Tooltip"
          subtitle="Informational popup on hover or focus"
          onPress={() => onPress("UITooltip")}
        />
        <ListItem
          size="md"
          title="Typewriter"
          subtitle="Text that animates as if being typed"
          onPress={() => onPress("UITypewriter")}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITesting;
