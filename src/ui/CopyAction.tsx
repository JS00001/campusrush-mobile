/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import useCopy from "@/hooks/useCopy";
import Menu, { MenuAction } from "@/ui/Menu";

interface CopyActionProps {
  /* The title of the menu action (I.E. "Copy ID") */
  title: string;
  /* The content to be copied */
  content: string;
  /* The component to wrap */
  children: React.ReactNode;
}

const CopyAction: React.FC<CopyActionProps> = ({
  title,
  content,
  children,
}) => {
  const copy = useCopy();

  const actions: MenuAction[] = [
    {
      id: "COPY",
      title: title,
      onPress: () => copy(content),
    },
  ];

  return (
    <Menu shouldOpenOnLongPress actions={actions} style={tw`w-full`}>
      {children}
    </Menu>
  );
};

export default CopyAction;
