/*
 * Created on Tue Sep 03 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import * as MediaLibrary from 'expo-media-library';

import { alert } from '@/lib/util';

const useCameraRoll = () => {
  /**
   * Take an image from a URL and save it
   * to the user's camera roll.
   */
  const saveImage = async (url: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);

      if (status !== 'granted') {
        alert({
          title: 'Could Not Save Image',
          message:
            'CampusRush does not have permission to save images to your camera roll.',
        });
      }

      const newFileUri = FileSystem.documentDirectory + 'image.jpg';
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        newFileUri,
      );

      const download = await downloadResumable.downloadAsync();

      if (!download) {
        alert({
          title: 'Could Not Save Image',
          message: 'Failed to download the image.',
        });
        return;
      }

      const uri = download.uri;
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('CampusRush', asset, false);

      Toast.show({
        type: 'success',
        text1: 'Image Saved',
        text2: 'The image was saved to your camera roll.',
      });
    } catch (e) {
      alert({
        title: 'Could Not Save Image',
        message: 'An error occurred while saving the image.',
      });
    }
  };

  return { saveImage };
};

export default useCameraRoll;
