/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState, useEffect } from "react";

import Text from "@/ui/Text";
import { variantClasses } from "@/ui/Text/Text";

interface TypewriterProps {
  text: string;
  delay?: number;
  style?: any;
  variant?: keyof typeof variantClasses;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  style,
  delay = 100,
  variant = "text",
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex]);

  return (
    <Text variant={variant} style={style}>
      {currentText}
    </Text>
  );
};

export default Typewriter;
