/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  MenuAction as RNMenuAction,
  MenuComponentProps as RNMenuComponentProps,
  MenuView as RNMenuView,
  NativeActionEvent as RNNativeActionEvent,
} from "@react-native-menu/menu";

/**
 * Ovveride the MenuComponentProps to remove the actions and onPressAction.
 * We implement custom actions and we handle the onPressAction in the Menu component.
 */
export type MenuComponentProps = Omit<
  RNMenuComponentProps,
  "actions" | "onPressAction"
>;

/**
 * Ovveride the MenuAction to add the onPress function.
 */
export type MenuAction = RNMenuAction & {
  onPress?: () => void;
};

interface MenuProps extends MenuComponentProps {
  actions: MenuAction[];
}

const Menu: React.FC<MenuProps> = ({ actions, ...props }) => {
  /**
   * Handle the press action event by finding the action and calling
   * its onPress function if it exists.
   */
  const handlePressAction = ({ nativeEvent }: RNNativeActionEvent) => {
    const eventId = nativeEvent.event;
    const action = actions.find((action) => action.id === eventId);

    if (!action) return;

    if (action.onPress) {
      action.onPress();
    }
  };

  return (
    <RNMenuView
      {...props}
      actions={actions}
      onPressAction={handlePressAction}
    />
  );
};

export default Menu;
