/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import BottomSheet from "./Components/BottomSheet";
import BottomSheetContainer from "./Components/BottomSheetContainer";

import tw from "@/lib/tailwind";
import Text from "@/ui/Text";

interface HelpProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const Help: React.FC<HelpProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => (
        <BottomSheetContainer>
          <Text>Help</Text>
        </BottomSheetContainer>
      )}
    />
  );
};

export default Help;
