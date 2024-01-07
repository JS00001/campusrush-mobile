/*
 * Created on Sat Jan 06 2024
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

import BottomSheet from "./Components/BottomSheet";
import BottomSheetContainer from "./Components/BottomSheetContainer";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import usePnm from "@/hooks/pnms/usePnm";
import IconButton from "@/ui/IconButton";
import DetailView from "@/ui/DetailView";
import { formatPhoneNumber } from "@/lib/util/string";

interface PnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handlePresentModalPress: (name: string, props?: any) => void;
}

const Pnm: React.FC<PnmProps> = ({
  innerRef,
  handleCloseModalPress,
  handlePresentModalPress,
}) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const pnmId = data?.data.pnmId;

        const { pnm, ...actions } = usePnm(pnmId);

        const deletePnm = async () => {
          handleCloseModalPress();
          actions.delete();
        };

        const onEditPress = () => {
          handlePresentModalPress("UPDATE_PNM", { pnmId: pnm._id });
        };

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <View style={tw`shrink`}>
                <Text variant="title">
                  {pnm.firstName} {pnm.lastName}
                </Text>
                <Text variant="body">
                  Added on {date.toString(pnm.createdAt) || "N/A"}
                </Text>
              </View>

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="md"
                  loading={actions.loading === "favoriting"}
                  icon={pnm.starred ? "ri-star-fill" : "ri-star-line"}
                  // prettier-ignore
                  color={pnm.starred ? tw.color("yellow-500") : tw.color("primary")}
                  onPress={actions.favorite}
                />
                <IconButton
                  size="md"
                  icon="ri-delete-bin-6-line"
                  color={tw.color("red-600")}
                  onPress={deletePnm}
                  loading={actions.loading === "deleting"}
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
    />
  );
};

export default Pnm;
