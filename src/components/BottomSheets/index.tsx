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

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import ChapterSheet from "./Chapter/index";
import CreateMessageSheet from "./CreateMessage";
import CreateEventSheet from "./CreateEvent";
import FormEditorSheet from "./FormEditor";
import ActionMenuSheet from "./ActionMenu";
import ManageFormFieldSheet from "./FormEditor/Components/ManageFormField";
import CreatePnmSheet from "./CreatePnm";
import CustomPhoneNumberSheet from "./CustomPhoneNumber";
import DeveloperToolsSheet from "./DevTools";
import DynamicNotificationSheet from "./DynamicNotification";
import EventSheet from "./Event";
import EventResponsesSheet from "./EventResponses";
import FormSheet from "./Form";
import FormResponseSheet from "./FormResponse";
import FormResponsesSheet from "./FormResponses";
import PnmSheet from "./Pnm";
import PlanComparisonSheet from "./PlanComparison";
import PrivacyPolicySheet from "./PrivacyPolicy";
import TagSelectorSheet from "./TagSelector";
import TermsOfServiceSheet from "./TermsOfService";
import UpdatePnmSheet from "./UpdatePnm";
import UpdateEventSheet from "./UpdateEvent";
import ViolationsSheet from "./Violations";

import type { IndividualSheetName } from "./@types";

import { useBottomSheetStore } from "@/store";

/**
 * The list of all bottom sheets we want to support
 */
const BottomSheets: Record<IndividualSheetName, React.FC<any>> = {
  ACTION_MENU: ActionMenuSheet,
  CHAPTER: ChapterSheet,
  CREATE_MESSAGE: CreateMessageSheet,
  CREATE_EVENT: CreateEventSheet,
  FORM_EDITOR: FormEditorSheet,
  CREATE_PNM: CreatePnmSheet,
  CUSTOM_PHONE_NUMBER: CustomPhoneNumberSheet,
  DEVELOPER_TOOLS: DeveloperToolsSheet,
  DYNAMIC_NOTIFICATION: DynamicNotificationSheet,
  EVENT: EventSheet,
  EVENT_RESPONSES: EventResponsesSheet,
  FORM: FormSheet,
  FORM_RESPONSE: FormResponseSheet,
  FORM_RESPONSES: FormResponsesSheet,
  MANAGE_FORM_FIELD: ManageFormFieldSheet,
  PNM: PnmSheet,
  PLAN_COMPARISON: PlanComparisonSheet,
  PRIVACY_POLICY: PrivacyPolicySheet,
  TAG_SELECTOR: TagSelectorSheet,
  TERMS_OF_SERVICE: TermsOfServiceSheet,
  UPDATE_PNM: UpdatePnmSheet,
  UPDATE_EVENT: UpdateEventSheet,
  VIOLATIONS: ViolationsSheet,
};

/**
 * The component to render all bottom sheets and handle their visibility
 */
const BottomSheetsComponent = () => {
  // These MUST use selectors to avoid infinite re-rendering due to the 'register'
  // method updating the state, therefore re-rendering this, which re-registers the
  // bottom sheet, and so on.
  const close = useBottomSheetStore((state) => state.close);
  const register = useBottomSheetStore((state) => state.register);
  const snapToIndex = useBottomSheetStore((state) => state.snapToIndex);
  const snapToPosition = useBottomSheetStore((state) => state.snapToPosition);

  return Object.keys(BottomSheets).map((key) => {
    const name: IndividualSheetName = key as IndividualSheetName;
    const Sheet = BottomSheets[name];

    if (!Sheet) return null;

    const props = {
      close: () => close(name),
      snapToIndex: (i: number) => snapToIndex(name, i),
      snapToPosition: (pos: string) => snapToPosition(name, pos),
      innerRef: (ref: BottomSheetModal) => register(name, ref),
    };

    return <Sheet key={name} {...props} />;
  });
};

export default BottomSheetsComponent;
