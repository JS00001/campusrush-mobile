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

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import ListItem from "@/ui/ListItems/ListItem";

const Landing: React.FC<UseSheetFlowProps> = ({ nextView, setView }) => {
  const onQrCodePress = () => {
    setView(5);
  };

  return (
    <>
      <Headline
        style={tw`mb-2`}
        title="Add a PNM"
        subtitle="Add a PNM to your chapter to keep track of their rush."
      />

      <ListItem
        size="lg"
        title="Share QR Code or Link"
        subtitle="Share a QR code with a PNM"
        icon="QrCodeFill"
        ph-label="share-qr-code"
        onPress={onQrCodePress}
      />
      <ListItem
        size="lg"
        title="Add PNM Manually"
        subtitle="Add a PNMs info manually"
        icon="UserPlusFill"
        ph-label="add-pnm-manually"
        onPress={nextView}
      />
    </>
  );
};

export default Landing;
