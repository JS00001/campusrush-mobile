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

import { useEffect, useState } from "react";

import Text, { TextProps } from "@/ui/Text";

interface TypewriterProps extends TextProps {
  delay?: number;
  style?: any;
  children: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  delay = 100,
  style,
  children,
  ...props
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // If the current index is less than the length of the text, then we want to
  // add a new character to the current text after a delay
  useEffect(() => {
    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + children[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <Text style={style} {...props}>
      {currentText}
    </Text>
  );
};

export default Typewriter;
