import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionIcon from "./TransactionIcon";
import { FC, useContext } from "react";
import {
  ExpenseCategories,
  TransactionDetailsType,
  TransactionType,
} from "@/constants/types";
import { Colors } from "@/constants/constants";
import AppText from "./AppText";
import { Link, router } from "expo-router";
import { TransactionsContext } from "@/app/context/transactionsContext";

const screenWidth = Dimensions.get("window").width;
const maxChars = Math.floor(screenWidth / 20);

const Transaction: FC<TransactionDetailsType> = ({
  id,
  category,
  name,
  amount,
  date,
  type,
}) => {
  const { setIdToEdit, setMode } = useContext(TransactionsContext);

  const handleTransactionPress = () => {
    setIdToEdit(id);
    setMode("edit");
    router.push("/transaction-details");
  };

  const displayText =
    name.length > maxChars ? `${name.slice(0, maxChars)}...` : name;
  return (
    <TouchableOpacity style={styles.container} onPress={handleTransactionPress}>
      <View style={styles.emojiContainer}>
        <TransactionIcon category={category} />
      </View>
      <View style={styles.detailsText}>
        <Text style={styles.nameText}>{displayText}</Text>
        <AppText style={styles.dateText}>{date}</AppText>
      </View>
      <View style={styles.amountContainer}>
        <AppText
          style={[
            styles.amountText,
            {
              color: type === "expense" ? Colors.red : Colors.green,
            },
          ]}
        >
          {type === "expense" ? "-₦" : "+₦"}
          {amount}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    backgroundColor: "white",
  },
  emojiContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.transparentGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsText: {
    marginLeft: 20,
    gap: 5,
  },
  nameText: {
    fontSize: 17,
    fontFamily: "Montserrat_600SemiBold",
  },
  dateText: {
    color: Colors.grayText,
    fontSize: 12,
  },
  amountContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
