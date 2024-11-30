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

import {
  EntitlementRenewState,
  EntitlementSource,
} from "react-native-qonversion";
import { Linking, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import { alert } from "@/lib/util";
import Headline from "@/ui/Headline";
import IconLabel from "@/ui/IconLabel";
import Hyperlink from "@/ui/Hyperlink";
import { titleCase } from "@/lib/util/string";
import { useQonversion } from "@/providers/external/Qonversion";
import { useBottomSheet } from "@/providers/BottomSheet";

const BillingView = () => {
  const URL = "https://apps.apple.com/account/subscriptions";

  const { openBottomSheet } = useBottomSheet();
  const { entitlements, restorePurchases } = useQonversion();

  const containerStyles = tw.style("bg-gray-100 rounded-xl p-5 gap-y-5 w-full");

  const onComparePlansPress = () => {
    openBottomSheet("PLAN_COMPARISON");
  };

  const onManageBilling = () => {
    const entitlement = entitlements[0];

    if (entitlement.source == EntitlementSource.APP_STORE) {
      Linking.openURL(URL);
    } else if (entitlement.source == EntitlementSource.MANUAL) {
      alert({
        title: "Manage Subscription",
        message:
          "This subscription was granted to you by an administrator. You are not able to manage it at this time.",
      });
    } else if (entitlement.source == EntitlementSource.STRIPE) {
      alert({
        title: "Manage Subscription",
        message:
          "This subscription was created through our website. You must manage it through its respective platform.",
      });
    }
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
            <View>
              <Text type="h4">{titleCase(entitlement.id)} Subscription</Text>
              <Text>Thank you for choosing CampusRush</Text>
            </View>

            <IconLabel
              size="md"
              color="tertiary"
              iconName="Hourglass"
              title="Subscriber Since"
              subtitle={
                date.toString(entitlement.firstPurchaseDate as Date) || "N/A"
              }
            />

            <IconLabel
              size="md"
              color="tertiary"
              iconName="ArrowClockwise"
              title={renewText}
              subtitle={
                date.toString(entitlement.expirationDate as Date) || "N/A"
              }
            />

            <View>
              <Button
                size="sm"
                style={tw`bg-gray-200`}
                textStyle={tw`text-red-500`}
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

export default BillingView;
