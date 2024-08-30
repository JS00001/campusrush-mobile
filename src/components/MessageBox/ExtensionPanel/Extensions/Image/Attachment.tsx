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
    "rounded-lg bg-slate-100 border border-slate-200",
    "h-15 w-15",
  );

  return (
    <View style={containerStyles} {...props}>
      <Image
        source={IMAGE_URL}
        contentFit="cover"
        style={tw.style(`flex-1`, { borderRadius: 8 })}
      />

      <TouchableOpacity
        style={tw`absolute -top-3.5 -right-3.5 rounded-full p-2`}
        onPress={handleRemovePress}
      >
        <View style={tw`bg-slate-500 rounded-full p-0.5`}>
          <Icon name="close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageAttachment;
