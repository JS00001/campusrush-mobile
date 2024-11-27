const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// Get the base Sentry config
const sentryConfig = getSentryExpoConfig(__dirname);

module.exports = sentryConfig;
