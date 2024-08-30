/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { BottomSheetProps, SheetData } from "./@types";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import TagView from "@/components/TagView";
import ButtonGroup from "@/ui/ButtonGroup";
import usePosthog from "@/hooks/usePosthog";
import { BottomSheet } from "@/ui/BottomSheet";
import { useGlobalStore, usePnmStore } from "@/store";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useDeletePnm, useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

const PnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  openBottomSheet,
}) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"PNM">) => {
        const { pnmId } = props!.data;
        const posthog = usePosthog();
        const navigation = useNavigation();

        const pnmStore = usePnmStore();
        const globalStore = useGlobalStore();

        const pnmQuery = useGetPnm(pnmId);
        const deleteMutation = useDeletePnm();
        const updateMutation = useUpdatePnm();

        const pnm = pnmQuery.pnm;

        const onFavorite = async () => {
          if (!pnm) return;

          const starred = !pnm.starred;
          const res = await updateMutation.mutateAsync({ id: pnmId, starred });

          if ("error" in res) return;

          pnmStore.addOrUpdatePnm(res.data.pnm);
          pnmQuery.refetch();

          if (starred) {
            globalStore.favoritePnm(pnm);
          } else {
            globalStore.unfavoritePnm(pnm);
          }

          posthog.capture("PNM_FAVORITED");
        };

        const onDelete = async () => {
          if (!pnm) return;

          const displayName = pnm.displayName;
          const res = await deleteMutation.mutateAsync({ id: pnmId });

          if ("error" in res) return;

          pnmStore.deletePnm(pnmId);
          globalStore.deletePnm(pnm);

          Toast.show({
            type: "success",
            text1: "PNM Deleted",
            text2: `${displayName} has been removed from your contacts`,
          });

          handleClose();

          posthog.capture("PNM_DELETED");
        };

        const onSendMessagePress = () => {
          if (!pnm) return;

          handleClose();
          navigation.navigate("Conversation", {
            screen: "Chat",
            params: {
              pnm,
            },
          });
        };

        const onEditPress = () => {
          openBottomSheet("UPDATE_PNM", { pnmId });
        };

        if (!pnm) return <LoadingState />;

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <Headline
                style={tw`shrink`}
                title={pnm.displayName}
                subtitle={`Added on ${date.toString(pnm.createdAt)}`}
              />

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="sm"
                  color="secondary"
                  loading={updateMutation.isLoading}
                  iconName={pnm.starred ? "star-fill" : "star-line"}
                  // prettier-ignore
                  iconColor={pnm.starred ? tw.color("yellow") : tw.color("primary")}
                  onPress={onFavorite}
                />
                <IconButton
                  size="sm"
                  color="secondary"
                  loading={deleteMutation.isLoading}
                  iconName="delete-bin-6-line"
                  iconColor={tw.color("red")}
                  onPress={onDelete}
                />
              </View>
            </View>

            <Detail.List>
              <Detail.Item
                title="Phone Number"
                value={format.phoneNumber(pnm.phoneNumber) || "N/A"}
              />
              <Detail.Item title="Instagram" value={pnm.instagram || "N/A"} />
              <Detail.Item title="Snapchat" value={pnm.snapchat || "N/A"} />
              <Detail.Item
                title="Tags"
                // Same as below, make the view look like the other list items when no tags
                layout={!pnm.tags.length ? "horizontal" : "vertical"}
                // Make the tags view look like the other list items when no tags, otherwise render the tags list
                // prettier-ignore
                value={!pnm.tags.length ? "N/A" : <TagView disabled hideContainer tags={pnm.tags}/>}
              />
            </Detail.List>

            <ButtonGroup>
              <Button size="sm" color="secondary" onPress={onEditPress}>
                Edit
              </Button>
              <Button size="sm" onPress={onSendMessagePress}>
                Send Message
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    ></BottomSheet>
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer>
      <View style={tw`mb-2 flex-row justify-between items-center gap-2`}>
        <View style={tw`flex-1 gap-2`}>
          <Skeleton height={24} />
          <Skeleton width={"75%"} height={16} />
        </View>

        <View style={tw`flex-row gap-1`}>
          <Skeleton width={48} height={48} borderRadius={999} />
          <Skeleton width={48} height={48} borderRadius={999} />
        </View>
      </View>

      <Skeleton height={196} />

      <Skeleton height={54} />
    </BottomSheetContainer>
  );
};

export default PnmSheet;
