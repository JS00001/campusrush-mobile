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

import General from "./Views/General";
import FormResponses from "./Views/FormResponses";

import { BottomSheetProps, SheetData } from "../@types";

import Tabs from "@/ui/Tabs";
import tw from "@/lib/tailwind";
import Avatar from "@/ui/Avatar";
import date from "@/lib/util/date";
import { alert } from "@/lib/util";
import Headline from "@/ui/Headline";
import IconButton from "@/ui/IconButton";
import usePosthog from "@/hooks/usePosthog";
import { useImageZoomStore } from "@/store";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

import { useDeletePnm, useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

enum PnmDetailsTab {
  GENERAL,
  FORM_RESPONSES,
}

type Props = BottomSheetProps & SheetData<"PNM">;

const Content: React.FC<Props> = ({ data, close, snapToPosition }) => {
  const initialPnm = data.pnm;
  const [tab, setTab] = useState(PnmDetailsTab.GENERAL);

  const posthog = usePosthog();
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

  return (
    <BottomSheetContainer
      style={tw`p-0`}
      contentContainerStyle={tw`gap-y-6 pt-6 px-6 pb-8 rounded-t-3xl`}
    >
      <View
        style={tw`bg-gray-200 absolute h-32 left-0 right-0 rounded-t-3xl`}
      />

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

      <Tabs
        type="navigation"
        tabs={["General", "Form Responses"]}
        currentIndex={tab}
        onChange={setTab}
      />

      {/* General Information */}
      {tab === PnmDetailsTab.GENERAL && <General pnm={pnm} />}

      {/* Form Responses */}
      {tab === PnmDetailsTab.FORM_RESPONSES && <FormResponses pnm={pnm} />}
    </BottomSheetContainer>
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
