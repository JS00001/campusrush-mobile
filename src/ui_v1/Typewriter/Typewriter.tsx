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

import Text from "@/ui_v1/Text";
import { variantClasses } from "@/ui_v1/Text/Text";

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
  // The current text that is being displayed
  const [currentText, setCurrentText] = useState("");
  // The current index of the text that is being displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // If the current index is less than the length of the text, then we want to
  // add a new character to the current text after a delay
  useEffect(() => {
    // Check if the current index is less than the length of the text (there are more characters to display)
    if (currentIndex < text.length) {
      // Every x milliseconds, add a new character to the current text
      const timeout = setTimeout(() => {
        setCurrentText(currentText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

      // Clear the timeout when the component unmounts
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
