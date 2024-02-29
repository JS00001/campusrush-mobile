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
import { useEffect, useState } from "react";

import { BottomSheetProps } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import IconButton from "@/ui/IconButton";
import DetailView from "@/ui/DetailView";
import { BottomSheet } from "@/ui/BottomSheet";
import { useGlobalStore, usePnmStore } from "@/store";
import { formatPhoneNumber } from "@/lib/util/string";
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
      children={(data) => {
        const pnmId = data?.data.pnmId as string;

        const pnmStore = usePnmStore();
        const globalStore = useGlobalStore();

        const pnmQuery = useGetPnm(pnmId);
        const deleteMutation = useDeletePnm();
        const updateMutation = useUpdatePnm();

        /**
         * We need to use state here as a 'cache', because when the pnm is deleted,
         * the store value becomes undefined, and we need to keep the pnm data so
         * the app doesnt crash before the bottom sheet is closed.
         */
        const [pnm, setPnm] = useState(pnmQuery.pnm);

        useEffect(() => {
          if (pnmQuery.pnm) setPnm(pnmQuery.pnm);
        }, [pnmQuery.pnm]);

        const onFavorite = async (starred: boolean) => {
          if (!pnm) return;

          const res = await updateMutation.mutateAsync({ id: pnmId, starred });

          if ("error" in res) return;

          pnmStore.addOrUpdatePnm(res.data.pnm);
          pnmQuery.refetch();

          if (starred) {
            globalStore.favoritePnm(pnm);
          } else {
            globalStore.unfavoritePnm(pnm);
          }
        };

        const onDelete = async () => {
          if (!pnm) return;

          const res = await deleteMutation.mutateAsync({ id: pnmId });

          if ("error" in res) return;

          pnmStore.deletePnm(pnm._id);
          globalStore.deletePnm(pnm);
          handleClose();
        };

        const onEditPress = () => {
          openBottomSheet("UPDATE_PNM", { pnmId });
        };

        if (!pnm) {
          return <LoadingState />;
        }

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <View style={tw`shrink`}>
                <Text variant="title">
                  {pnm.firstName} {pnm.lastName}
                </Text>
                <Text variant="body">
                  Added on {date.toString(pnm.createdAt)}
                </Text>
              </View>

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="md"
                  loading={updateMutation.isLoading}
                  icon={pnm.starred ? "ri-star-fill" : "ri-star-line"}
                  color={pnm.starred ? tw.color("yellow") : tw.color("primary")}
                  onPress={() => onFavorite(!pnm.starred)}
                />
                <IconButton
                  size="md"
                  loading={deleteMutation.isLoading}
                  icon="ri-delete-bin-6-line"
                  color={tw.color("red")}
                  onPress={onDelete}
                />
              </View>
            </View>

            <DetailView>
              <DetailView.Section
                title="Phone Number"
                content={formatPhoneNumber(pnm.phoneNumber) || "N/A"}
              />
              <DetailView.Section
                title="Classification"
                content={pnm.classification || "N/A"}
              />
              <DetailView.Section
                title="Instagram"
                content={pnm.instagram || "N/A"}
              />
              <DetailView.Section
                title="Snapchat"
                content={pnm.snapchat || "N/A"}
              />
            </DetailView>

            <Button size="sm" onPress={onEditPress}>
              Edit PNM
            </Button>
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
