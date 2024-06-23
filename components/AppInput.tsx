import React, { useState } from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import AppText from "./AppText";
import { Colors, FontSizes } from "@/utils/constants";

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  isValid?: boolean;
}

const AppInput: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  isValid = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <AppText
        style={[
          styles.label,
          !isValid
            ? {
                color: Colors.red,
                fontFamily: "Montserrat_600SemiBold",
              }
            : {},
        ]}
      >
        {label}
      </AppText>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.focusedInput : {},
          !isValid ? styles.invalidInput : {},
          value === ""
            ? {
                fontSize: FontSizes.small,
              }
            : {},
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    fontSize: FontSizes.medium,
    fontFamily: "Montserrat_400Regular",
  },
  focusedInput: {
    borderColor: "black",
  },
  invalidInput: {
    borderColor: Colors.red,
  },
});

export default AppInput;
