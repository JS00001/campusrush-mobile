/*
 * Created on Sun Aug 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { BaseToast } from "react-native-toast-message";

import tw from "@/lib/tailwind";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={tw`bg-white rounded-full border-l-green-400 shadow-sm`}
      text1Style={tw`text-black text-sm font-medium`}
      text2Style={tw`text-black text-sm`}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={tw`bg-white rounded-full border-l-red-500  shadow-sm`}
      text1Style={tw`text-black text-sm font-medium`}
      text2Style={tw`text-black text-sm`}
    />
  ),
};

export default toastConfig;
