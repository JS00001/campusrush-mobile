/*
 * Created on Mon Jul 22 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import Onboarding from "@/components/Onboarding";

const BillingTourStep6: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={6}
      title="Plan Events"
      description="Plan, share, and manage your rush events. Send event details and RSVP links to PNMs to keep track of attendance."
      pages={[
        "BillingTourStep1",
        "BillingTourStep2",
        "BillingTourStep3",
        "BillingTourStep4",
        "BillingTourStep5",
        "BillingTourStep6",
      ]}
      largeBentoContent={largeBentoContent}
      smallBentoContent={smallBentoContent}
    />
  );
};

const LargeBentoCell: React.FC = () => {
  return <></>;
};

const FirstSmallBentoCell: React.FC = () => {
  return <></>;
};

const SecondSmallBentoCell: React.FC = () => {
  return <></>;
};

export default BillingTourStep6;
