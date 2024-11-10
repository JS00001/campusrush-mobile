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

import { ImagePickerAsset } from 'expo-image-picker';

import { useUploadFile } from '@/hooks/api/upload';

const useCloudStorage = () => {
  const uploadMutation = useUploadFile();

  /**
   * Upload an image to our R2 instance. Ensures that the image is SFW
   * Returns the URL of the uploaded image
   */
  const uploadImage = async (image: ImagePickerAsset) => {
    const fileName = image.uri.split('/').pop();
    const formData = new FormData();

    const payload = {
      uri: image.uri,
      name: fileName,
      type: 'image/jpeg',
    } as unknown as Blob;

    formData.append('attachment', payload);

    const res = await uploadMutation.mutateAsync(formData).catch(() => {
      console.log('Failed to upload image');
    });

    if (!res) return;

    const imageUrl = res.data.url;

    return imageUrl;
  };

  return { uploadImage, isLoading: uploadMutation.isPending };
};

export default useCloudStorage;
