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
      style={tw`border-l-green-400 bg-slate-600 border border-slate-500`}
      text1Style={tw`text-white text-xs font-medium`}
      text2Style={tw`text-white text-sm`}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={tw`border-l-red-400 bg-slate-600 border border-slate-500`}
      text1Style={tw`text-white text-xs font-medium`}
      text2Style={tw`text-white text-sm`}
    />
  ),
};

export default toastConfig;
