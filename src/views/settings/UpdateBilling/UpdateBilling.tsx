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
import RemixIcon from "react-native-remix-icon";
import { EntitlementRenewState } from "react-native-qonversion";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Hyperlink from "@/ui/Hyperlink";
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

  // TODO: Add an error message
  if (!entitlements) return null;

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
              <Text variant="title" style={tw`capitalize`}>
                {entitlement.id} Subscription
              </Text>
              <Text>Thank you for choosing CampusRush</Text>
            </View>

            <View style={tw`flex-row items-center gap-2`}>
              <View style={tw`p-2 rounded-full bg-slate-200`}>
                <RemixIcon
                  name="timer-fill"
                  size={16}
                  color={tw.color("primary")}
                />
              </View>

              <View>
                <Text variant="body" style={tw`text-primary`}>
                  Subscriber Since
                </Text>
                <Text variant="body">
                  {date.toString(entitlement.firstPurchaseDate as Date) ||
                    "N/A"}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center gap-2`}>
              <View style={tw`p-2 rounded-full bg-slate-200`}>
                <RemixIcon
                  name="arrow-go-forward-fill"
                  size={16}
                  color={tw.color("primary")}
                />
              </View>

              <View>
                <Text variant="body" style={tw`text-primary`}>
                  {renewText}
                </Text>
                <Text variant="body">
                  {date.toString(entitlement.expirationDate as Date) || "N/A"}
                </Text>
              </View>
            </View>

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
                Compare Plans
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
