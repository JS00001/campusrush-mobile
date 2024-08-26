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

import ChapterSheet from "./Chapter/index";
import CreateMessageSheet from "./CreateMessage";
import CreateEventSheet from "./CreateEvent";
import CreatePnmSheet from "./CreatePnm";
import CustomPhoneNumberSheet from "./CustomPhoneNumber";
import DeveloperToolsSheet from "./DevTools";
import DynamicNotificationSheet from "./DynamicNotification";
import EventSheet from "./Event";
import EventResponsesSheet from "./EventResponses";
import PnmSheet from "./Pnm";
import PlanComparisonSheet from "./PlanComparison";
import PrivacyPolicySheet from "./PrivacyPolicy";
import TagSelectorSheet from "./TagSelector";
import TermsOfServiceSheet from "./TermsOfService";
import UpdatePnmSheet from "./UpdatePnm";
import UpdateEventSheet from "./UpdateEvent";

import type { IndividualSheetName } from "./@types";

const BottomSheets: Record<IndividualSheetName, React.FC<any>> = {
  CHAPTER: ChapterSheet,
  CREATE_MESSAGE: CreateMessageSheet,
  CREATE_EVENT: CreateEventSheet,
  CREATE_PNM: CreatePnmSheet,
  CUSTOM_PHONE_NUMBER: CustomPhoneNumberSheet,
  DEVELOPER_TOOLS: DeveloperToolsSheet,
  DYNAMIC_NOTIFICATION: DynamicNotificationSheet,
  EVENT: EventSheet,
  EVENT_RESPONSES: EventResponsesSheet,
  PNM: PnmSheet,
  PLAN_COMPARISON: PlanComparisonSheet,
  PRIVACY_POLICY: PrivacyPolicySheet,
  TAG_SELECTOR: TagSelectorSheet,
  TERMS_OF_SERVICE: TermsOfServiceSheet,
  UPDATE_PNM: UpdatePnmSheet,
  UPDATE_EVENT: UpdateEventSheet,
};

export default BottomSheets;
