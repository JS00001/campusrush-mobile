const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'Campus Rush (DEV)' : 'Campus Rush',
  slug: 'campusrush',
  version: '1.0.34',
  orientation: 'portrait',
  icon: IS_DEV ? './assets/development-icon.png' : './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: IS_DEV ? './assets/development-splash.png' : './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'app.campusrush',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: '9e0d874e-cc30-4dca-ae7e-9609b121b1ae',
    },
    revenueCat: {
      publicKey: 'appl_cjerjYwfjLIGoYMsbLhqPxeeqwp',
    },
    sentry: {
      dsn: 'https://e67ab04c64431925a12476788c0e22a9@o4506311638843392.ingest.sentry.io/4506317292175360',
    },
  },
  updates: {
    url: 'https://u.expo.dev/9e0d874e-cc30-4dca-ae7e-9609b121b1ae',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  owner: 'js00001',
  plugins: [
    'sentry-expo',
    [
      'expo-sensors',
      {
        motionPermission: 'Allow $(PRODUCT_NAME) to access your device motion.',
      },
    ],
  ],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'campusrush',
          project: 'campusrush-mobile',
        },
      },
    ],
  },
};
