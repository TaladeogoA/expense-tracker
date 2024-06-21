import AppText from "@/components/AppText";
import Transaction from "@/components/Transaction";
import { Colors, FontSizes, IconSizes } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { View, Dimensions, Text, FlatList } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContext } from "../context/transactionsContext";

const screenWidth = Dimensions.get("window").width;

const AllTransactions = () => {
  const { allTransactions } = useContext(TransactionsContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Link href="/">
          <Ionicons name="chevron-back" size={IconSizes.medium} color="black" />
        </Link>
        <AppText
          style={{
            textAlign: "center",
            fontSize: FontSizes.large,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          All Expenses
        </AppText>
        <Ionicons name="filter" size={IconSizes.small} color="black" />
      </View>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        data={Object.values(allTransactions)}
        renderItem={({ item }) => (
          <Transaction
            id={item.id}
            category={item.category}
            name={item.name}
            amount={item.amount}
            date={item.date}
            type={item.type}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.lightGray }} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <AppText
              style={{
                color: Colors.grayText,
              }}
            >
              No transactions yet
            </AppText>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AllTransactions;
