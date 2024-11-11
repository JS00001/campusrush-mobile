/*
 * Created on Mon Nov 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface StickyHeaderProps {
  children: React.ReactNode;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ children }) => {
  return (
    <Text type="p3" style={tw`w-full bg-white font-medium py-1`}>
      {children}
    </Text>
  );
};

export default StickyHeader;
