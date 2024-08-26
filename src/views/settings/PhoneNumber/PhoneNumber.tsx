/*
 * Created on Sun Aug 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import CopyView from "@/ui/CopyView";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { useAuth } from "@/providers/Auth";

const PhoneNumberView = () => {
  const { chapter } = useAuth();

  const phoneNumber =
    format.phoneNumber(chapter.phoneNumber) || "Processing... Come back later.";
  const phoneNumberId =
    chapter?.phoneNumberId || "Processing... Come back later.";

  return (
    <>
      <Headline
        title="Phone Information"
        subtitle="All messages to this phone number will show up in your 'Messages' inbox."
      />
      <CopyView title="Phone Number" content={phoneNumber} />
      <CopyView title="Phone Number ID" content={phoneNumberId} />
    </>
  );
};

export default PhoneNumberView;
