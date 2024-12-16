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

import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import General from "./Views/General";
import FormResponses from "./Views/FormResponses";

import { BottomSheetProps, SheetData } from "../@types";

import Tabs from "@/ui/Tabs";
import tw from "@/lib/tailwind";
import Avatar from "@/ui/Avatar";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import { alert } from "@/lib/util";
import Headline from "@/ui/Headline";
import { ChapterRole } from "@/@types";
import IconButton from "@/ui/IconButton";
import ButtonGroup from "@/ui/ButtonGroup";
import { useUser } from "@/providers/User";
import usePosthog from "@/hooks/usePosthog";
import { BottomSheet } from "@/ui/BottomSheet";
import RoleGuard from "@/components/RoleGuard";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useBottomSheetStore, useImageZoomStore } from "@/store";
import { useDeletePnm, useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

enum PnmDetailsTab {
  GENERAL,
  FORM_RESPONSES,
}

type Props = BottomSheetProps & SheetData<"PNM">;

const Content: React.FC<Props> = ({ data, close }) => {
  const initialPnm = data.pnm;
  const [tab, setTab] = useState(PnmDetailsTab.GENERAL);

  const posthog = usePosthog();
  const navigation = useNavigation();
  const { hasPermission } = useUser();
  const { setImage } = useImageZoomStore();
  const bottomSheetStore = useBottomSheetStore();

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

  const onSendMessagePress = () => {
    close();
    navigation.navigate("Conversation", {
      screen: "Chat",
      params: {
        pnm,
      },
    });
  };

  const onEditPress = () => {
    bottomSheetStore.open("UPDATE_PNM", { pnm });
  };

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

            close();
          },
        },
      ],
    });
  };

  const onAvatarPress = () => {
    if (!pnm?.avatar) return;
    setImage(pnm.avatar);
  };

  const contentContainerStyle = tw.style(
    "gap-y-4 pt-6 px-6",
    hasPermission(ChapterRole.Editor) ? "pb-26" : "pb-10",
  );

  return (
    <>
      <BottomSheetContainer
        style={tw`p-0 rounded-t-3xl`}
        contentContainerStyle={contentContainerStyle}
      >
        <View style={tw`bg-gray-200 absolute h-28 left-0 right-0`} />

        <RoleGuard role={ChapterRole.Editor}>
          <View style={tw`flex-row gap-1 absolute right-6 top-6`}>
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
        </RoleGuard>

        <View style={tw`gap-y-2 pt-12`}>
          <Avatar
            contentRing
            url={pnm.avatar}
            onPress={pnm.avatar ? onAvatarPress : undefined}
          />
          <Headline
            style={tw`shrink`}
            titleStyle={tw`text-xl`}
            title={pnm.displayName}
            subtitle={`Created on ${date.toString(pnm.createdAt)}`}
          />
        </View>

        <Tabs
          type="navigation"
          tabs={["General", "Form Responses"]}
          currentIndex={tab}
          onChange={setTab}
        />

        {tab === PnmDetailsTab.GENERAL && <General pnm={pnm} />}
        {tab === PnmDetailsTab.FORM_RESPONSES && <FormResponses pnm={pnm} />}
      </BottomSheetContainer>

      {/* Floating bottom button container */}
      <RoleGuard role={ChapterRole.Editor}>
        <View style={tw`bg-white absolute px-6 bottom-0 pb-8 pt-4 w-full`}>
          <ButtonGroup>
            <Button disabled color="secondary" onPress={onEditPress}>
              Edit
            </Button>
            <Button onPress={onSendMessagePress}>Send Message</Button>
          </ButtonGroup>
        </View>
      </RoleGuard>
    </>
  );
};

const PnmSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      handleStyle={tw`absolute w-full`}
      children={(data?: SheetData<"PNM">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default PnmSheet;
