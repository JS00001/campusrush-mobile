/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";

interface ImageAttachmentProps extends ViewProps {
  image: string;
  onRemove?: (event: string) => void;
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({
  image,
  style,
  onRemove,
  ...props
}) => {
  const IMAGE_URL = image;

  /**
   * On press, remove the attachment
   */
  const handleRemovePress = () => {
    if (onRemove) {
      onRemove(image);
    }
  };

  const containerStyles = tw.style(
    "h-15 w-15 rounded-xl",
    "bg-gray-100 border border-gray-300",
  );

  const removeButtonStyles = tw.style(
    "absolute -top-3.5 -right-3.5 rounded-full p-2",
  );

  return (
    <View style={containerStyles} {...props}>
      <Image
        source={IMAGE_URL}
        contentFit="cover"
        style={tw.style(`flex-1`, { borderRadius: 11 })}
      />

      <TouchableOpacity style={removeButtonStyles} onPress={handleRemovePress}>
        <View style={tw`bg-gray-500 rounded-full p-0.5`}>
          <Icon icon="X" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageAttachment;
