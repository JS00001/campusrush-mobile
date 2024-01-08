/*
 * Created on Fri Dec 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

// prettier-ignore
export const eventsRegex = new RegExp(/<event:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}>/);
// prettier-ignore
export const emailRegex = new RegExp(/^\S+@\S+$/);
// prettier-ignore
export const socialMediaRegex = new RegExp(/^(?<=^|[^\/])(@?[A-Za-z0-9_.]{3,25})$/);

export const phoneRegex = new RegExp(/^\+?1\d{10}$|^\d{10}$/);

export const urlRegex = new RegExp(/(https?:\/\/[^\s]+)/);

export const namesRegex = new RegExp(/^[A-Za-z]+$/);

export const verificationCodeRegex = new RegExp(/^\d{6}$/);
