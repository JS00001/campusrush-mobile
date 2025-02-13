const package_file = require('./package.json');

const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'Campus Rush (DEV)' : 'Campus Rush',
  slug: 'campusrush',
  version: package_file.version,
  orientation: 'portrait',
  icon: IS_DEV ? './assets/development-icon.png' : './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: IS_DEV ? './assets/development-splash.png' : './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: IS_DEV ? '#321BF7' : '#1A1940',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    // Change for multiple builds
    buildNumber: '1',
    bundleIdentifier: IS_DEV ? 'app.campusrush.dev' : 'app.campusrush',
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {},
  web: {},
  extra: {
    eas: {
      projectId: '9e0d874e-cc30-4dca-ae7e-9609b121b1ae',
    },
    qonversion: {
      projectKey: '0vNPscbrDatfqzz0xf_WqVf3fsydPhrb',
    },
    sentry: {
      dsn: 'https://e67ab04c64431925a12476788c0e22a9@o4506311638843392.ingest.sentry.io/4506317292175360',
    },
    posthog: {
      apiKey: 'phc_kCcXq7raquwqhmH9wwRmhrtxnhxfyfURMXH7qDynRoq',
      url: 'https://us.posthog.com',
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
    'expo-font',
    'expo-localization',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Campus Rush needs access to your photos to upload avatars and images.',
        cameraPermission:
          'Campus Rush needs access to your camera to take photos and videos for avatars and messages.',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission:
          'Campus Rush needs access to your photos to upload avatars and images.',
        savePhotosPermission:
          'Campus Rush needs access to save message images to your photos.',
      },
    ],
    [
      '@sentry/react-native',
      {
        url: 'https://sentry.io/',
        project: 'campusrush-mobile',
        organization: 'campusrush',
      },
    ],
  ],
};
