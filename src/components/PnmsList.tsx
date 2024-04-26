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
import { FlashList } from "@shopify/flash-list";
import { View, RefreshControl } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Headline from "@/ui/Headline";
import ListItemLoader from "@/ui/Loaders/ListItem";
import { formatPhoneNumber } from "@/lib/util/string";
import { useBottomSheet } from "@/providers/BottomSheet";

interface PnmsListProps {
  pnms: PNM[];
  loading?: boolean;
  onRefetch?: () => Promise<void>;
}

const PnmsList: React.FC<PnmsListProps> = ({ pnms, onRefetch, loading }) => {
  const { openBottomSheet } = useBottomSheet();
  const [isRefetching, setIsRefetching] = useState(false);

  /**
   * When pnms change, create a new list like this
   * [ "A", ...PNMs with first name starting with A, "B", ...PNMs with first name starting with B, ...]
   * Only have an entry if there are pnms with that letter first name
   */
  const [data, indices] = useMemo(() => {
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
        const firstLetter = pnm.firstName[0].toUpperCase();

        // If no entry exists for the first letter, create one
        if (!acc[firstLetter]) {
          acc[firstLetter] = [firstLetter];
        }

        acc[firstLetter].push(pnm);

        return acc;
      },
      {} as Record<string, Array<string | PNM>>,
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
  const ItemComponent = ({ item: data }: { item: PNM | string }) => {
    if (typeof data === "string") {
      return <Text style={tw`bg-white w-full font-medium`}>{data}</Text>;
    }

    const onPress = () => {
      openBottomSheet("PNM", { pnmId: data._id });
    };

    return (
      <ListItem
        style={tw`my-1`}
        key={data._id}
        title={`${data.firstName} ${data.lastName}`}
        subtitle={formatPhoneNumber(data.phoneNumber)}
        icon={data.starred ? "star-fill" : undefined}
        iconColor={tw.color("yellow")}
        onPress={onPress}
      />
    );
  };

  /**
   * Renders a loader if the list is loading, or a message if the list is empty
   */
  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(20).fill(0).map((_, i) => <ListItemLoader key={i} />);
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
        // Sticks the letters to the top of the list
        renderItem={ItemComponent}
        stickyHeaderIndices={indices}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default PnmsList;
