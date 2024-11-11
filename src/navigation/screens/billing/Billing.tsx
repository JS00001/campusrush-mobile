/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Qonversion, { PurchaseModel } from "react-native-qonversion";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Skeleton from "@/ui/Skeleton";
import { Layout } from "@/ui/Layout";
import Hyperlink from "@/ui/Hyperlink";
import Icon, { IconType } from "@/ui/Icon";
import { useUser } from "@/providers/User";
import usePosthog from "@/hooks/usePosthog";
import SafeAreaView from "@/ui/SafeAreaView";
import { useLogout } from "@/hooks/api/auth";
import Logo32 from "@/components/Logos/Logo32";
import { useGetMetadata } from "@/hooks/api/external";
import { useBottomSheet } from "@/providers/BottomSheet";
import HeaderBackground from "@/components/Backgrounds/Header";
import { useQonversion } from "@/providers/external/Qonversion";
import ErrorMessage from "@/components/ErrorMessage";

const BillingScreen = () => {
  const posthog = usePosthog();
  const { chapter } = useUser();
  const { openBottomSheet } = useBottomSheet();
  const { purchaseProduct, restorePurchases } = useQonversion();

  const logoutMutation = useLogout();
  const metadataQuery = useGetMetadata();

  const [purchaseLoading, setPurchaseLoading] = useState(false);

  /**
   * Fetch all of the products from Qonversion and
   * sort them by their price
   */
  const query = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const offerings = await Qonversion.getSharedInstance().offerings();
      const offering = offerings?.main;
      const products = offering?.products;

      if (!products) return [];

      // Filter out the products that are not subscriptions or
      // are sandbox products
      const productionProducts = products.filter((product) => {
        return !product.qonversionID.startsWith("sandbox");
      });

      const sortedProducts = productionProducts.sort((a, b) => {
        const aPrice = a.price as number;
        const bPrice = b.price as number;

        return aPrice - bPrice;
      });

      return sortedProducts;
    },
  });

  const isLoading = query.isLoading || metadataQuery.isLoading;
  const error = query.error || metadataQuery.error;

  const subscription = query.data?.[0];
  const metadata = metadataQuery.data;

  /**
   * The header subtitle displays the price of the subscription along
   * with the trial if there is one
   */
  const headerSubtitle = (() => {
    if (!subscription) return;

    if (subscription.trialPeriod) {
      const subtitleString = [
        "Free for",
        `${subscription.trialPeriod.unitCount}-${subscription.trialPeriod.unit.toLowerCase()}s`,
        "then",
        `${subscription.prettyPrice}`,
        `/${subscription.subscriptionPeriod?.unit.toLowerCase()}`,
      ];

      return subtitleString.join(" ");
    }

    return subscription.prettyPrice;
  })();

  /**
   * The button CTA displays whether or not there is a trial period, and
   * the price of the subscription
   */
  const buttonCTA = (() => {
    let ctaString: string[];

    if (!subscription) return;

    // If there is a trial period, tell the user about it
    if (subscription.trialPeriod) {
      ctaString = [
        "Start your",
        `${subscription.trialPeriod.unitCount}-${subscription.trialPeriod.unit.toLowerCase()}`,
        "free trial, and then",
        `${subscription.prettyPrice}`,
        `/${subscription.subscriptionPeriod?.unit.toLowerCase()}`,
      ];
    } else {
      ctaString = [
        "Subscribe for",
        `${subscription.prettyPrice}`,
        `/${subscription.subscriptionPeriod?.unit.toLowerCase()}`,
      ];
    }

    return ctaString.join(" ");
  })();

  const featuresContainerStyle = tw.style(
    "bg-gray-100",
    "w-full rounded-xl px-4 py-8 gap-y-6",
  );

  const footerViewStyle = tw.style("px-6 pt-3 gap-y-3 items-center");

  /**
   * When the feature button is pressed, open the plan comparison bottom sheet
   */
  const onFeaturePress = () => {
    posthog.capture("COMPARE_PLANS_BUTTON_PRESSED");
    openBottomSheet("PLAN_COMPARISON");
  };

  /**
   * When the purchase button is pressed, purchase the selected product, do
   * not throw an error if the buyer cancels the purchase
   */
  const onPurchase = async () => {
    if (!subscription) return;
    setPurchaseLoading(true);
    const purchaseModel = subscription.toPurchaseModel() as PurchaseModel;
    await purchaseProduct(purchaseModel);
    setPurchaseLoading(false);
  };

  /**
   * When the terms and conditions button is pressed, open the terms and conditions
   */
  const onTermsPress = () => {
    openBottomSheet("TERMS_OF_SERVICE");
  };

  /**
   * When the logout button is pressed, log the user out
   */
  const onLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <Layout.Root>
      <Layout.CustomHeader>
        {/* Background Circles */}
        <View style={tw`absolute w-full h-full`}>
          <HeaderBackground />
        </View>

        {/* Header */}
        <View style={tw`px-6 py-4 z-10`}>
          <SafeAreaView
            position="top"
            style={tw`items-center justify-center gap-y-3 mt-6`}
          >
            <Logo32 />

            <Text type="h1" style={tw`text-center text-white`}>
              Get Started with CampusRush
            </Text>

            <Text type="p1" style={tw`text-center text-white`}>
              {headerSubtitle}
            </Text>
          </SafeAreaView>
        </View>
      </Layout.CustomHeader>

      <Layout.Content scrollable gap={18}>
        {/* Loading State */}
        {isLoading && <Skeleton height={400} width="100%" />}

        {/* Error State */}
        {error && (
          <ErrorMessage error={error} description="Could not load products" />
        )}

        {/* Content */}
        {metadata && subscription && (
          <View style={featuresContainerStyle}>
            {metadata.entitlements.perks.featured.map((feature, index) => {
              const containerStyles = tw.style("w-full gap-x-3 flex-row");

              const textContainerStyles = tw.style("gap-y-1 shrink");
              const titleStyles = tw.style("text-primary font-medium");

              return (
                <View key={index} style={containerStyles}>
                  <Icon
                    size={20}
                    color={tw.color("primary")}
                    name={feature.icon as IconType}
                  />

                  <View style={textContainerStyles}>
                    <Text type="p2" style={titleStyles}>
                      {feature.title}
                    </Text>
                    <Text type="p3">{feature.description}</Text>
                  </View>
                </View>
              );
            })}

            <View style={tw`mt-2 gap-y-2`}>
              <Button size="sm" color="tertiary" onPress={onFeaturePress}>
                View All Features
              </Button>
            </View>
          </View>
        )}
      </Layout.Content>

      <Layout.Footer style={tw`bg-white border-t border-gray-200`}>
        <View style={footerViewStyle}>
          <Button size="lg" onPress={onPurchase} loading={purchaseLoading}>
            {buttonCTA}
          </Button>

          <Text style={tw`text-center text-sm`}>
            By purchasing, you agree to our{" "}
            <Hyperlink style={tw`text-xs`} onPress={onTermsPress}>
              Terms
            </Hyperlink>
            . If {chapter.email} is not your email,{" "}
            <Hyperlink style={tw`text-xs`} onPress={onLogout}>
              Sign out.
            </Hyperlink>{" "}
            Redeemed an offer already?{" "}
            <Hyperlink style={tw`text-xs`} onPress={restorePurchases}>
              Restore Purchases
            </Hyperlink>
          </Text>
        </View>
      </Layout.Footer>
    </Layout.Root>
  );
};

export default BillingScreen;
