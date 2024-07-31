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

import { useState } from "react";
import { FlatList } from "react-native";

import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import Header from "@/ui/Header";
import FilterChip from "@/ui/FilterChip";

// The maximum number of PNMs to render at a time
const VISIBLE_PNM_LIMIT = 10;

interface MassMessageHeaderProps {
  pnms: PNM[];
  onPnmRemove: (pnm: PNM) => void;
}

const MassMessageHeader: React.FC<MassMessageHeaderProps> = ({
  pnms,
  onPnmRemove,
}) => {
  const [visiblePnms, setVisiblePnms] = useState(VISIBLE_PNM_LIMIT);

  const pnmsRemovable = pnms.length > 2;
  const currentPnms = pnms.slice(0, visiblePnms);

  const onRemove = (pnm: PNM) => {
    if (pnmsRemovable) {
      onPnmRemove(pnm);
    }
  };

  /**
   * Paginate the PNMs rendered so that if they message 200 pnms at once, we are not rendering
   * 200 badges on first render.
   */
  const onEndReached = () => {
    setVisiblePnms((prev) => prev + VISIBLE_PNM_LIMIT);
  };

  return (
    <Header hasBackButton title="New Message" subtitle={`${pnms.length} PNMs`}>
      <FlatList
        horizontal
        data={currentPnms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const fullName = `${item.firstName} ${item.lastName}`;

          if (pnmsRemovable) {
            return (
              <FilterChip
                size="md"
                color="primary"
                onRemove={onRemove.bind(null, item)}
              >
                {fullName}
              </FilterChip>
            );
          }

          return <Badge size="md">{fullName}</Badge>;
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row gap-0.5 pl-6 pb-3`}
      />
    </Header>
  );
};

export default MassMessageHeader;
