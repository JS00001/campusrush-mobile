/*
 * Created on Fri Aug 11 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
interface APIResponse {
  data: {
    data: {
      error?: APIError;
    };
  };
}

interface APIError {
  error: {
    field?: string;
    traceback: string;
    message: string;
    humanMessage: string;
  };
}

type LogoutAPIResponse = APIResponse;

type DeletePnmAPIResponse = APIResponse;

type DeletePnmsAPIResponse = APIResponse;

type GetOrganizationsAPIResponse = APIResponse & {
  data: {
    data: {
      organizations: string[];
      schools: string[];
    };
  };
};

type LoginAsOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
      accessToken: string;
      refreshToken: string;
    };
  };
};

type RegisterAsOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
      accessToken: string;
      refreshToken: string;
    };
  };
};

type GetOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type CheckOrganizationExistsAPIResponse = APIResponse & {
  data: {
    data: {
      exists: boolean;
    };
  };
};

type CheckEmailExistsAPIResponse = APIResponse & {
  data: {
    data: {
      exists: boolean;
    };
  };
};

type VerifyOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type ResendVerificationAPIResponse = APIResponse & {
  data: {
    data: {
      message: string;
    };
  };
};

type RefreshAccessTokenAPIResponse = APIResponse & {
  data: {
    data: {
      accessToken: string;
    };
  };
};

type UpdateOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type GetOrganizationStatisticsAPIResponse = APIResponse & {
  data: {
    data: {
      pnms: number;
      starredPnms: number;
      recentPnms: PNM[];
    };
  };
};

type GetPnmsAPIResponse = APIResponse & {
  data: {
    data: {
      pnms: PNM[];
    };
  };
};

type GetAdminStatisticsAPIResponse = APIResponse & {
  data: {
    data: {
      numOrganizations: number;
      numPayingOrganizations: number;
    };
  };
};

type GetAdminOrganizationsAPIResponse = APIResponse & {
  data: {
    data: {
      organizations: Organization[];
    };
  };
};

type GetAdminOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type UpgradeOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type DowngradeOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
    };
  };
};

type GetConversationAPIResponse = APIResponse & {
  data: {
    data: {
      conversation: Conversation | null;
      nextOffset: number;
      hasNextPage: boolean;
    };
  };
};

type FocusConversationAPIResponse = APIResponse & {
  data: {
    data: {
      conversation: Conversation;
    };
  };
};

type GetConversationsAPIResponse = APIResponse & {
  data: {
    data: {
      conversations: Conversation[];
      nextOffset: number;
      hasNextPage: boolean;
    };
  };
};

type GetContactsAPIResponse = APIResponse & {
  data: {
    data: {
      all: PNM[];
      favorited: PNM[];
      suggested: PNM[];
      uncontacted: PNM[];
    };
  };
};

type SendMassMessageAPIResponse = APIResponse & {
  data: {
    data: {
      conversations: Conversation[];
      messages: Message[];
    };
  };
};

type SendDirectMessageAPIResponse = APIResponse & {
  data: {
    data: {
      conversation: Conversation;
      message: Message;
    };
  };
};

type CreatePnmAPIResponse = APIResponse & {
  data: {
    data: {
      pnm: PNM;
    };
  };
};

type UpdatePnmAPIResponse = APIResponse & {
  data: {
    data: {
      pnm: PNM;
    };
  };
};

type GetPnmAPIResponse = APIResponse & {
  data: {
    data: {
      pnm: PNM;
    };
  };
};

type GetEntitlementsAPIResponse = APIResponse & {
  data: {
    data: EntitlementDetails;
  };
};
