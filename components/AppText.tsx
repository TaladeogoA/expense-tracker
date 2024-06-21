import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  style?: TextStyle[] | TextStyle;
}

const AppText: React.FC<AppTextProps> = ({ style, children, ...props }) => {
  const defaultStyle: TextStyle = {
    fontFamily: "Montserrat_400Regular",
  };

  return (
    <Text style={[defaultStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
