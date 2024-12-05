/*
 * Created on Wed Nov 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useNavigation } from "@react-navigation/native";

import type { IPNM } from "@/types";

import Button from "@/ui/Button";
import format from "@/lib/util/format";
import { Detail } from "@/ui/DetailList";
import TagView from "@/components/TagView";
import ButtonGroup from "@/ui/ButtonGroup";
import { useBottomSheetStore } from "@/store";

interface ViewProps {
  pnm: IPNM;
}

const General: React.FC<ViewProps> = ({ pnm }) => {
  const navigation = useNavigation();
  const bottomSheetStore = useBottomSheetStore();

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

  return (
    <>
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
    </>
  );
};

export default General;
