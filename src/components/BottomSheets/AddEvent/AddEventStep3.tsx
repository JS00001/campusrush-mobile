/*
 * Created on Wed Dec 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { AddEventScreens } from "./types";

import { UseCreateEvent } from "@/hooks/events/useCreateEvent";

interface AddEventStep3Props extends UseCreateEvent {
  setScreen: (screen: AddEventScreens) => void;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventStep3: React.FC<AddEventStep3Props> = () => {
  return <></>;
};

export default AddEventStep3;
