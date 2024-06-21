import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#858585",
          headerShown: false,
        }}
        tabBar={(props) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("index")}
            >
              <TabBarIcon
                name={
                  props.state.index === 0 ? "hourglass" : "hourglass-outline"
                }
                color={props.state.index === 0 ? "#000000" : "#858585"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TabBarIcon name="add" color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("all")}>
              <TabBarIcon
                name={props.state.index === 1 ? "list" : "list-outline"}
                color={props.state.index === 1 ? "#000000" : "#858585"}
              />
            </TouchableOpacity>
          </View>
        )}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "hourglass" : "hourglass-outline"}
                color={color}
              />
            ),
            title: "Recent",
            tabBarLabelStyle: { fontFamily: "Montserrat_500Medium" },
          }}
        />
        <Tabs.Screen
          name="all"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color}
              />
            ),
            title: "All",
            tabBarLabelStyle: { fontFamily: "Montserrat_500Medium" },
          }}
        />
      </Tabs>
    </>
  );
}
