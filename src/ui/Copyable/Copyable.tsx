/*
 * Created on Wed Nov 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { MenuView } from "@react-native-menu/menu";

import tw from "@/lib/tailwind";
import useCopy from "@/hooks/util/useCopy";

interface CopyableProps {
  title: string;
  copyText: string;
  children: React.ReactNode;
}

const Copyable: React.FC<CopyableProps> = ({ title, copyText, children }) => {
  const copy = useCopy();

  // When the user presses the copy button, play a haptic feedback and copy the text to the clipboard
  const onCopyPress = () => {
    copy(copyText);
  };

  return (
    <MenuView
      actions={[{ title: title }]}
      shouldOpenOnLongPress
      onPressAction={onCopyPress}
      style={tw`w-full`}
    >
      {children}
    </MenuView>
  );
};

export default Copyable;
