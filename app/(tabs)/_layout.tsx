import AddExpenseModal from "@/components/AddExpenseModal";
import TabBar from "@/components/navigation/TabBar";
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
          <TabBar
            {...props}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
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
        <Tabs.Screen
          name="transaction-details"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <AddExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
