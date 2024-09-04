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
import Avatar from "@/ui/Avatar";
import date from "@/lib/util/date";
import { alert } from "@/lib/util";
import Skeleton from "@/ui/Skeleton";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import TagView from "@/components/TagView";
import ButtonGroup from "@/ui/ButtonGroup";
import usePosthog from "@/hooks/usePosthog";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useGlobalStore, useImageZoomStore, usePnmStore } from "@/store";
import { useDeletePnm, useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

const PnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  openBottomSheet,
}) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      handleStyle={tw`bg-slate-200 rounded-t-2xl`}
      children={(props?: SheetData<"PNM">) => {
        const { pnmId } = props!.data;
        const posthog = usePosthog();
        const navigation = useNavigation();

        const pnmStore = usePnmStore();
        const globalStore = useGlobalStore();
        const { setImage } = useImageZoomStore();

        const pnmQuery = useGetPnm(pnmId);
        const deleteMutation = useDeletePnm();
        const updateMutation = useUpdatePnm();

        const pnm = pnmQuery.pnm;

        const onFavorite = async () => {
          if (!pnm) return;

          const starred = !pnm.starred;

          const response = await updateMutation.mutateAsync({
            id: pnmId,
            starred,
          });

          pnmStore.addOrUpdatePnm(response.data.pnm);
          pnmQuery.refetch();

          if (starred) {
            globalStore.favoritePnm(pnm);
          } else {
            globalStore.unfavoritePnm(pnm);
          }

          const EVENT_NAME = starred ? "PNM_FAVORITED" : "PNM_UNFAVORITED";

          posthog.capture(EVENT_NAME);
        };

        const onDelete = async () => {
          if (!pnm) return;

          alert({
            title: "Delete PNM",
            message: `Are you sure you want to delete this PNM?`,
            buttons: [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  const displayName = pnm.displayName;
                  await deleteMutation.mutateAsync({ id: pnmId });

                  pnmStore.deletePnm(pnmId);
                  globalStore.deletePnm(pnm);

                  Toast.show({
                    type: "success",
                    text1: "PNM Deleted",
                    text2: `${displayName} has been removed from your contacts`,
                  });

                  handleClose();

                  posthog.capture("PNM_DELETED");
                },
              },
            ],
          });
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

        const onAvatarPress = () => {
          if (!pnm?.avatar) return;
          setImage(pnm.avatar);
        };

        if (!pnm) return <LoadingState />;

        return (
          <>
            <View style={tw`bg-slate-200 absolute h-26 w-full`} />

            <BottomSheetContainer
              style={tw`pt-0`}
              contentContainerStyle={tw`gap-y-6 pb-10`}
            >
              <View style={tw`flex-row gap-1 justify-end`}>
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

              <View style={tw`gap-y-2`}>
                <Avatar
                  contentRing
                  url={pnm.avatar}
                  onPress={pnm.avatar ? onAvatarPress : undefined}
                />

                <Headline
                  style={tw`shrink`}
                  title={pnm.displayName}
                  subtitle={`Added on ${date.toString(pnm.createdAt)}`}
                />
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
          </>
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
