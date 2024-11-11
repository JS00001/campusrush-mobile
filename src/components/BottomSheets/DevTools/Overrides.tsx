/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import AppConstants from "@/constants";
import { usePreferences } from "@/providers/Preferences";

const Overrides = () => {
  const { updatePreferences } = usePreferences();

  const resetPreferences = () => {
    updatePreferences(AppConstants.preferences);
  };

  return (
    <>
      <Button
        color="secondary"
        textStyle={tw`text-red-500`}
        onPress={resetPreferences}
      >
        Reset All Preferences
      </Button>
    </>
  );
};

export default Overrides;
