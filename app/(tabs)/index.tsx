import AppText from "@/components/AppText";
import Transaction from "@/components/Transaction";
import { Colors, IconSizes } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContext } from "../context/transactionsContext";
import { formatter } from "@/utils/utils";
import { fetchTransactions } from "@/utils/axios";
import moment from "moment";

export default function RecentScreen() {
  const { setTransactions: setContextTransactions, allTransactions } =
    useContext(TransactionsContext);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchTransactions();
      setContextTransactions(result);
    }
    fetchData();
  }, []);

  const today = moment();
  const last7Days = Object.entries(allTransactions).filter(
    ([id, transaction]) =>
      moment(transaction.date).isBetween(
        today.clone().subtract(7, "days"),
        today
      )
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBar}>
            <View>
              <AppText
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 20,
                }}
              >
                Good morning,
              </AppText>
              <AppText
                style={{ fontFamily: "Montserrat_700Bold", fontSize: 25 }}
              >
                Darla
              </AppText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Image
                source={require("../../assets/images/avatar.jpg")}
                style={styles.avatarContainer}
              />
            </View>
          </View>
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 30,
                }}
              >
                💵
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <AppText style={styles.cardHeading}>Total income</AppText>
                <AppText
                  style={[
                    styles.cardAmount,
                    {
                      color: Colors.green,
                    },
                  ]}
                >
                  {formatter.format(
                    Object.values(allTransactions).reduce(
                      (acc, curr) =>
                        curr.type === "income" ? acc + curr.amount : acc,
                      0
                    )
                  )}
                </AppText>
              </View>
            </View>

            <View
              style={{
                width: 1,
                backgroundColor: "#8f8f8f",
              }}
            />

            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 30,
                }}
              >
                💳
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <AppText style={styles.cardHeading}>Total expenses</AppText>
                <AppText
                  style={[
                    styles.cardAmount,
                    {
                      color: Colors.red,
                    },
                  ]}
                >
                  {formatter.format(
                    Object.values(allTransactions).reduce(
                      (acc, curr) =>
                        curr.type === "expense" ? acc + curr.amount : acc,
                      0
                    )
                  )}
                </AppText>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <View
            style={{
              marginTop: 25,
              marginBottom: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AppText
              style={{
                fontFamily: "Montserrat_500Medium",
                color: "black",
                fontSize: 15,
              }}
            >
              Last 7 days
            </AppText>
            <Link href="/all">
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <AppText
                  style={{
                    color: "black",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 15,
                  }}
                >
                  See all
                </AppText>
                <Ionicons
                  name="arrow-forward"
                  size={IconSizes.small}
                  color="black"
                />
              </View>
            </Link>
          </View>
          <FlatList
            data={Object.entries(last7Days)}
            renderItem={({ item }) => {
              const [id, transaction] = item[1];

              return (
                <Transaction
                  id={id}
                  name={transaction.name}
                  amount={transaction.amount}
                  type={transaction.type}
                  category={transaction.category}
                  date={transaction.date}
                />
              );
            }}
            keyExtractor={(item) => item[0]}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.lightGray }} />
            )}
            showsVerticalScrollIndicator={false}
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
                  No recent transactions
                </AppText>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: Colors.mainColor,
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#8f8f8f",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  card: {
    width: "45%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10,
  },
  cardHeading: {
    fontSize: 13,
    fontWeight: "200",
  },
  cardAmount: {
    color: "black",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 5,
    flexWrap: "wrap",
  },

  smallText: {
    color: Colors.lightGray,
    fontSize: 12,
    fontWeight: "200",
  },
  transactionsContainer: {
    flexGrow: 1,
    backgroundColor: Colors.lightGray,
    shadowColor: "#8f8f8f",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
});
