/*
 * Created on Sun Sep 03 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo, useState } from "react";
import { View, RefreshControl } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";

import type { IPNM } from "@/types";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import StickyHeader from "@/ui/StickyHeader";
import ListItem from "@/ui/ListItems/ListItem";
import ListItemLoader from "@/ui/Loaders/ListItem";
import { useBottomSheet } from "@/providers/BottomSheet";

type ListDataTypes = IPNM | string;

interface PnmsListProps extends Partial<FlashListProps<ListDataTypes>> {
  pnms: IPNM[];
  loading: boolean;
  onRefetch: () => Promise<void>;
}

const PnmsList: React.FC<PnmsListProps> = ({
  pnms,
  onRefetch,
  loading,
  ...props
}) => {
  const { openBottomSheet } = useBottomSheet();
  const [isRefetching, setIsRefetching] = useState(false);

  /**
   * When pnms change, create a new list like this
   * [ "A", ...PNMs with first name starting with A, "B", ...PNMs with first name starting with B, ...]
   * Only have an entry if there are pnms with that letter first name
   * If the PNM has no first name, add it at the very end under a '#' header
   */
  const [data, indices] = useMemo(() => {
    // First, sort the pnms by first name, if no first name, put it at the end
    pnms.sort((a, b) => {
      if (!a.firstName) return 1;
      if (!b.firstName) return -1;

      return a.firstName.localeCompare(b.firstName);
    });

    /**
     * Takes the list of pnms and reduces them into a list that looks like this
     * {
     *  "A": ["A", PNM, PNM, ...],
     *  "B": ["B", PNM, PNM, ...],
     * }
     */
    const reduction = pnms.reduce(
      (acc, pnm) => {
        // Get the first letter of the first name
        const category = pnm.firstName?.[0].toUpperCase() ?? "#";

        if (!acc[category]) {
          acc[category] = [category];
        }

        acc[category].push(pnm);

        return acc;
      },
      {} as Record<string, Array<string | IPNM>>,
    );

    // Sort the keys and flatten the list
    const res = Object.keys(reduction)
      .sort((a, b) => a.localeCompare(b))
      .flatMap((key) => {
        return reduction[key];
      });

    // Get the indices of the header entries
    const stickyHeaderIndices = res.reduce((acc, item, index) => {
      if (typeof item === "string") {
        acc.push(index);
      }

      return acc;
    }, [] as number[]);

    return [res, stickyHeaderIndices];
  }, [pnms]);

  /**
   * When the list is refreshed, refetch the data
   */
  const onRefresh = async () => {
    setIsRefetching(true);
    await onRefetch?.();
    setIsRefetching(false);
  };

  /**
   * Conditionally renders either a header entry or a PNM entry
   * based on the type of data passed
   */
  const ItemComponent = ({ item: data }: { item: ListDataTypes }) => {
    if (typeof data === "string") {
      return <StickyHeader>{data}</StickyHeader>;
    }

    const onPress = () => {
      openBottomSheet("PNM", { pnm: data });
    };

    return (
      <ListItem
        ph-label="pnm-list-item"
        style={tw`my-1`}
        key={data._id}
        title={data.displayName}
        subtitle={format.phoneNumber(data.phoneNumber)}
        icon={data.starred ? "star-fill" : undefined}
        iconColor={tw.color("yellow-500")}
        onPress={onPress}
      />
    );
  };

  /**
   * Renders a loader if the list is loading, or a message if the list is empty
   */
  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(20)
        .fill(0)
        .map((_, i) => <ListItemLoader key={i} style={tw.style("my-2")} />);
    }

    return (
      <Headline
        title="No PNMs found"
        subtitle="Try changing your filters or refreshing the page"
        style={tw`mt-16 items-center`}
      />
    );
  };

  return (
    <View style={tw`flex-row flex-1`}>
      <FlashList
        data={data}
        // Used for optimization
        estimatedItemSize={84}
        renderItem={ItemComponent}
        // Sticks the letters to the top of the list
        stickyHeaderIndices={indices}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        {...props}
      />
    </View>
  );
};

export default PnmsList;
