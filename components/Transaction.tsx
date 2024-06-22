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
import { Colors, IconSizes } from "@/constants/constants";
import AppText from "./AppText";
import { Link, router } from "expo-router";
import { TransactionsContext } from "@/app/context/transactionsContext";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { formatter } from "@/constants/utils";

const screenWidth = Dimensions.get("window").width;
const maxChars = Math.floor(screenWidth / 23);

const Transaction: FC<TransactionDetailsType> = ({
  id,
  category,
  name,
  amount,
  date,
  type,
}) => {
  const { setIdToEdit, setMode, deleteTransaction } =
    useContext(TransactionsContext);

  const handleTransactionPress = () => {
    setIdToEdit(id);
    setMode("edit");
    router.push("/transaction-details");
  };

  const handleDelete = () => {
    deleteTransaction(id);
  };

  const displayText =
    name.length > maxChars ? `${name.slice(0, maxChars)}...` : name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleTransactionPress}
        style={styles.transactionInfo}
      >
        <View style={styles.emojiContainer}>
          <TransactionIcon category={category} />
        </View>
        <View style={styles.detailsText}>
          <Text style={styles.nameText}>{displayText}</Text>
          <AppText style={styles.dateText}>{date}</AppText>
        </View>
        <AppText
          style={[
            styles.amountText,
            {
              color: type === "expense" ? Colors.red : Colors.green,
            },
          ]}
        >
          {formatter.format(amount)}
        </AppText>
      </TouchableOpacity>
      <Menu style={{ padding: 10 }}>
        <MenuTrigger>
          <Ionicons
            name="ellipsis-vertical"
            size={IconSizes.small}
            color="black"
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleTransactionPress}>
            <Text style={styles.menuText}>View</Text>
          </MenuOption>
          <MenuOption onSelect={handleTransactionPress}>
            <Text style={styles.menuText}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={handleDelete}>
            <Text style={styles.menuText}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  emojiContainer: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.transparentGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsText: {
    marginLeft: 10,
    gap: 5,
    flex: 3,
  },
  nameText: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  dateText: {
    color: Colors.grayText,
    fontSize: 12,
  },
  amountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  menuText: {
    // fontSize: 16,
    // padding: 10,
  },
});
