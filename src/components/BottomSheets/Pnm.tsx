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
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import TagView from "@/components/TagView";
import ButtonGroup from "@/ui/ButtonGroup";
import { useImageZoomStore } from "@/store";
import usePosthog from "@/hooks/usePosthog";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useDeletePnm, useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

type Props = BottomSheetProps & SheetData<"PNM">;

const Content: React.FC<Props> = ({ data, openBottomSheet, handleClose }) => {
  const initialPnm = data.pnm;

  const posthog = usePosthog();
  const navigation = useNavigation();
  const { setImage } = useImageZoomStore();

  const deleteMutation = useDeletePnm();
  const updateMutation = useUpdatePnm();
  const getPnmQuery = useGetPnm(initialPnm._id);

  const pnm = getPnmQuery.data?.pnm || initialPnm;

  // Error State
  if (getPnmQuery.error || !pnm) {
    return (
      <ErrorMessage
        error={getPnmQuery.error}
        description="Failed to load PNM"
      />
    );
  }

  const onFavorite = async () => {
    const starred = !pnm.starred;

    await updateMutation.mutateAsync({
      id: pnm._id,
      starred,
    });

    const EVENT_NAME = starred ? "pnm_favorited" : "pnm_unfavorited";

    posthog.capture(EVENT_NAME);
  };

  const onDelete = async () => {
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
            await deleteMutation.mutateAsync({ id: pnm._id });

            Toast.show({
              type: "success",
              text1: "PNM Deleted",
              text2: `${displayName} has been removed from your contacts`,
            });

            handleClose();
          },
        },
      ],
    });
  };

  const onSendMessagePress = () => {
    handleClose();
    navigation.navigate("Conversation", {
      screen: "Chat",
      params: {
        pnm,
      },
    });
  };

  const onEditPress = () => {
    openBottomSheet("UPDATE_PNM", { pnm });
  };

  const onAvatarPress = () => {
    if (!pnm?.avatar) return;
    setImage(pnm.avatar);
  };

  return (
    <>
      <View style={tw`bg-gray-200 absolute h-26 w-full`} />

      <BottomSheetContainer
        style={tw`pt-0`}
        contentContainerStyle={tw`gap-y-6 pb-10`}
      >
        <View style={tw`flex-row gap-1 justify-end`}>
          <IconButton
            size="sm"
            color="secondary"
            loading={updateMutation.isPending}
            iconName={pnm.starred ? "StarFill" : "Star"}
            // prettier-ignore
            iconColor={pnm.starred ? tw.color("yellow-500") : tw.color("primary")}
            onPress={onFavorite}
          />
          <IconButton
            size="sm"
            color="secondary"
            iconName="Trash"
            iconColor={tw.color("red-500")}
            loading={deleteMutation.isPending}
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
            subtitle={`Created on ${date.toString(pnm.createdAt)}`}
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
};

const PnmSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      handleStyle={tw`bg-gray-200 rounded-t-2xl`}
      children={(data?: SheetData<"PNM">) => {
        return <Content data={data!.data} {...props} />;
      }}
    ></BottomSheet>
  );
};

export default PnmSheet;
