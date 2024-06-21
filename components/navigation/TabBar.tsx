import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "./TabBarIcon";
import { FC, useContext } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TransactionsContext } from "@/app/context/transactionsContext";

const TabBar: FC<BottomTabBarProps> = (props) => {
  const { setMode } = useContext(TransactionsContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("index")}
        style={styles.normalButton}
      >
        <TabBarIcon
          name={props.state.index === 0 ? "hourglass" : "hourglass-outline"}
          color={props.state.index === 0 ? "#000000" : "#858585"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMode("add");
          router.push("/transaction-details");
        }}
        style={{
          backgroundColor: "white",
          width: 60,
          height: 60,
          borderRadius: 60,
          borderColor: "black",
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: -22,
          left: "50%",
          transform: [{ translateX: -22 }],
        }}
      >
        <Ionicons name="add-outline" color="black" size={34} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/all")}
        style={styles.normalButton}
      >
        <TabBarIcon
          name={props.state.index === 1 ? "list" : "list-outline"}
          color={props.state.index === 1 ? "#000000" : "#858585"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  normalButton: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
