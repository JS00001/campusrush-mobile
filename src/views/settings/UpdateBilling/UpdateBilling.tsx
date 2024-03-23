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

import { Linking, View } from "react-native";
import { EntitlementRenewState } from "react-native-qonversion";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import IconLabel from "@/ui/IconLabel";
import Hyperlink from "@/ui/Hyperlink";
import { titleCase } from "@/lib/util/string";
import { useQonversion } from "@/providers/Qonversion";
import { useBottomSheets } from "@/providers/BottomSheet";

const UpdateBillingView = () => {
  const URL = "https://apps.apple.com/account/subscriptions";

  const { openBottomSheet } = useBottomSheets();
  const { entitlements, restorePurchases } = useQonversion();

  const containerStyles = tw.style(
    "bg-slate-100 rounded-xl p-5 gap-y-5 w-full",
  );

  const onComparePlansPress = () => {
    openBottomSheet("PLAN_COMPARISON");
  };

  const onManageBilling = () => {
    Linking.openURL(URL);
  };

  if (!entitlements)
    return (
      <Headline
        centerText
        title="No Subscriptions Found"
        subtitle="Please try again later"
      />
    );

  return (
    <View style={tw`w-full gap-y-4 items-center`}>
      {entitlements.map((entitlement) => {
        const renewText =
          entitlement.renewState == EntitlementRenewState.WILL_RENEW
            ? `Renews on`
            : `Expires on`;

        return (
          <View style={containerStyles} key={entitlement.id}>
            <Headline
              title={`${titleCase(entitlement.id)} Subscription`}
              subtitle="Thank you for choosing CampusRush"
            />

            <IconLabel
              size="xs"
              color="tertiary"
              iconName="timer-fill"
              title="Subscriber Since"
              subtitle={
                date.toString(entitlement.firstPurchaseDate as Date) || "N/A"
              }
            />

            <IconLabel
              size="xs"
              color="tertiary"
              iconName="arrow-go-forward-fill"
              title={renewText}
              subtitle={
                date.toString(entitlement.expirationDate as Date) || "N/A"
              }
            />

            <View>
              <Button
                size="sm"
                style={tw`bg-slate-200`}
                textStyle={tw`text-red`}
                onPress={onManageBilling}
              >
                Manage Subscription
              </Button>
              <Button
                size="sm"
                style={tw`bg-transparent`}
                textStyle={tw`text-primary`}
                onPress={onComparePlansPress}
              >
                View Features
              </Button>
            </View>
          </View>
        );
      })}

      <Hyperlink onPress={restorePurchases}>Restore Purchases</Hyperlink>
    </View>
  );
};

export default UpdateBillingView;
