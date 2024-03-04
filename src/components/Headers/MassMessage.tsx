/*
 * Created on Wed Feb 28 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { ScrollView } from "react-native";

import Badge from "@/ui_v1/Badge";
import tw from "@/lib/tailwind";
import Header from "@/ui_v1/Header";

interface MassMessageHeaderProps {
  pnms: PNM[];
  onPnmRemove: (pnm: PNM) => void;
}

const MassMessageHeader: React.FC<MassMessageHeaderProps> = ({
  pnms,
  onPnmRemove,
}) => {
  const title = `New Message (${pnms.length} PNMs)`;

  const onRemove = (pnm: PNM) => {
    if (pnms.length > 2) {
      onPnmRemove(pnm);
    }
  };

  return (
    <Header hasBackButton title={title}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row gap-0.5 pl-6 pb-3`}
      >
        {pnms.map((pnm, index) => (
          <Badge
            key={index}
            size="md"
            removable={pnms.length > 2}
            onRemove={onRemove.bind(null, pnm)}
          >
            {`${pnm.firstName} ${pnm.lastName}`}
          </Badge>
        ))}
      </ScrollView>
    </Header>
  );
};

export default MassMessageHeader;
