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

import { Linking } from "react-native";

import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Hyperlink from "@/ui/Hyperlink";

import { useAuth } from "@/providers/Auth";
import { useEntitlementStore } from "@/store";
import BillingDetails from "@/components/BillingDetails";

const UpdateBillingView = () => {
  // const { customerData } = useAuth();
  // const { offering, restorePurchases } = useIAPs();
  // const entitlements = useEntitlementStore((s) => s.entitlements);

  // const managementURL = customerData.managementURL;

  // /** The list of all of the productIds for the customers entitlements  */
  // const activeEntitlements = Object.keys(customerData.entitlements.active).map(
  //   (key) => customerData.entitlements.active[key].productIdentifier,
  // );

  // /**
  //  * The 'offering' is all of the currently available packages for the user to buy.
  //  * We are using this as a 'hack' to get the product information of all of the users
  //  * active entitlements. (There is currently no direcy way to get product information from
  //  * the users entitlements)
  //  */
  // const purchasedPackages =
  //   offering?.availablePackages.filter((pkg) =>
  //     activeEntitlements.includes(pkg.identifier),
  //   ) ?? [];

  // /** We want to 'group' together the package with its entitlement  */
  // const purchasedPackageInformation = purchasedPackages.map((pkg) => {
  //   const entitlementKey = Object.keys(customerData.entitlements.active).find(
  //     (key) => {
  //       return (
  //         customerData.entitlements.active[key].productIdentifier ===
  //         pkg.product.identifier
  //       );
  //     },
  //   );

  //   const entitlement = entitlementKey
  //     ? customerData.entitlements.active[entitlementKey]
  //     : null;

  //   return {
  //     product: pkg.product,
  //     entitlement,
  //   };
  // });

  // /**
  //  *  Format all of the products to be properly displayed, each product in the array will be formatted as:
  //  *  {
  //  *    title: "Product Title",
  //  *    description: "Product Description",
  //  *    subtitle: "Product Price",
  //  *    perks: ["Perk 1", "Perk 2", "Perk 3"]
  //  *  }
  //  */
  // const activePackageInformation = purchasedPackageInformation.map(
  //   (product) => {
  //     const isSubscription = product.product.productCategory === "SUBSCRIPTION";
  //     const isPendingCancellation = product.entitlement?.willRenew === false;
  //     const expirationDate = product.entitlement?.expirationDate
  //       ? date.toString(product.entitlement.expirationDate)
  //       : null;

  //     const title = product.product.title ?? "No Title";
  //     const description = (() => {
  //       if (isSubscription && isPendingCancellation) {
  //         return `Pending Cancellation on ${expirationDate}`;
  //       }

  //       if (isSubscription) {
  //         return `Renews automatically on ${expirationDate}`;
  //       }

  //       return "No Description";
  //     })();

  //     const subtitle =
  //       `${product.product.priceString} ${isSubscription ? "/ year" : ""}` ??
  //       "No Price";

  //     const id = product.product.identifier as ProductId;

  //     const perks = entitlements?.products[id]?.FEATURED_PERKS ?? [];

  //     return {
  //       title,
  //       description,
  //       subtitle,
  //       perks,
  //     };
  //   },
  // );

  // const onManageBilling = () => {
  //   if (managementURL) {
  //     Linking.openURL(managementURL);
  //   }
  // };

  // return (
  //   <>
  //     <BillingDetails activeProducts={activePackageInformation} />
  //     <Button onPress={onManageBilling}>Manage Subscription</Button>
  //     <Hyperlink onPress={restorePurchases}>Restore Purchases</Hyperlink>
  //   </>
  // );

  return <></>;
};

export default UpdateBillingView;
