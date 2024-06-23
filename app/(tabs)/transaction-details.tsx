import AppText from "@/components/AppText";
import {
  Colors,
  FontSizes,
  IconSizes,
  dropDownCategories,
} from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TransactionsContext } from "../context/transactionsContext";
import {
  ExpenseCategories,
  TransactionDetailsType,
  TransactionType,
} from "@/constants/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AppInput from "@/components/AppInput";
import { validate } from "@/constants/utils";

const TRANSACTION_TYPE = {
  EXPENSE: "expense",
  INCOME: "income",
};

const TransactionDetails = () => {
  const {
    idToEdit,
    setIdToEdit,
    mode,
    editTransaction,
    addTransaction,
    allTransactions,
  } = useContext(TransactionsContext);
  let selectedTransaction: TransactionDetailsType | null =
    allTransactions[idToEdit];

  const defaultTransaction = {
    category: { value: "", isValid: true },
    name: { value: "", isValid: true },
    amount: { value: "", isValid: true },
    type: { value: "expense", isValid: true },
    date: { value: new Date(), isValid: true },
  };

  const [transaction, setTransaction] = useState(defaultTransaction);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedTransaction) {
      setTransaction({
        category: { value: selectedTransaction.category, isValid: true },
        name: { value: selectedTransaction.name, isValid: true },
        amount: {
          value: selectedTransaction.amount.toString(),
          isValid: true,
        },
        type: { value: selectedTransaction.type, isValid: true },
        date: { value: selectedTransaction.date, isValid: true },
      });
    }
  }, [selectedTransaction]);

  const handleInputChange = useCallback(
    (
      field: keyof TransactionDetailsType,
      value: string | number | ExpenseCategories | TransactionType | Date
    ) => {
      setTransaction((prev) => ({
        ...prev,
        [field]: { value, isValid: validate(field, value) },
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setIdToEdit("");
    setTransaction(defaultTransaction);
  }, []);

  const handleSave = () => {
    const newTransaction = {
      id: mode === "edit" ? idToEdit : uuidv4(),
      category: transaction.category.value as ExpenseCategories,
      name: transaction.name.value,
      amount: Number(transaction.amount.value.replace(/,/g, "")),
      date: transaction.date.value,
      type: transaction.type.value as TransactionType,
    };

    const amountIsValid =
      newTransaction.amount > 0 && !isNaN(newTransaction.amount);
    const nameIsValid = newTransaction.name.trim().length > 0;
    const dateIsValid = newTransaction.date instanceof Date;
    const categoryIsValid = newTransaction.category.trim().length > 0;

    if (!amountIsValid || !nameIsValid || !dateIsValid || !categoryIsValid) {
      setTransaction((prev) => ({
        ...prev,
        amount: { ...prev.amount, isValid: amountIsValid },
        name: { ...prev.name, isValid: nameIsValid },
        date: { ...prev.date, isValid: dateIsValid },
        category: { ...prev.category, isValid: categoryIsValid },
      }));
      return;
    }

    if (mode === "edit") {
      editTransaction(newTransaction);
    } else {
      addTransaction(newTransaction);
    }
    resetForm();

    router.replace("/");
  };

  useEffect(() => {
    const backAction = () => {
      resetForm();
      router.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              resetForm();
              router.back();
            }}
          >
            <Ionicons
              name="chevron-back"
              size={IconSizes.medium}
              color="black"
            />
          </TouchableOpacity>
          <AppText style={styles.headerText}>Add Transaction</AppText>
        </View>
        <View style={{ gap: 20 }}>
          <View style={styles.typesContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transaction.type.value === TRANSACTION_TYPE.EXPENSE
                  ? styles.activeType
                  : {},
                {
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
              onPress={() =>
                handleInputChange("type", TRANSACTION_TYPE.EXPENSE)
              }
            >
              <AppText
                style={[
                  styles.typeText,
                  {
                    color:
                      transaction.type.value === TRANSACTION_TYPE.EXPENSE
                        ? "white"
                        : "black",
                  },
                ]}
              >
                Expense
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transaction.type.value === TRANSACTION_TYPE.INCOME
                  ? styles.activeType
                  : {},
                {
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
              onPress={() => handleInputChange("type", TRANSACTION_TYPE.INCOME)}
            >
              <AppText
                style={[
                  styles.typeText,
                  {
                    color:
                      transaction.type.value === TRANSACTION_TYPE.EXPENSE
                        ? "black"
                        : "white",
                  },
                ]}
              >
                Income
              </AppText>
            </TouchableOpacity>
          </View>
          <AppInput
            label="Name"
            placeholder="e.g., Groceries, Salary"
            value={transaction.name.value}
            onChangeText={(value) => handleInputChange("name", value)}
            isValid={transaction.name.isValid}
          />

          <AppInput
            label="Amount"
            placeholder="e.g., 0.00"
            value={transaction.amount.value}
            onChangeText={(value) => handleInputChange("amount", value)}
            keyboardType="numeric"
            isValid={transaction.amount.isValid}
          />
          <View>
            <AppText
              style={[
                styles.label,
                transaction.date.isValid
                  ? {}
                  : { color: Colors.red, fontFamily: "Montserrat_600SemiBold" },
              ]}
            >
              Date
            </AppText>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={[
                styles.textInput,
                {
                  paddingVertical: 20,
                },
                show ? { borderColor: "black" } : { borderColor: "grey" },
                transaction.date.isValid ? {} : { borderColor: "red" },
              ]}
            >
              <AppText
                style={
                  transaction.date
                    ? {
                        color: "black",
                        fontSize: FontSizes.medium,
                      }
                    : { color: "grey" }
                }
              >
                {transaction.date
                  ? transaction.date.value.toDateString()
                  : "e.g., YYYY-MM-DD"}
              </AppText>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || new Date();
                  handleInputChange("date", currentDate);
                  setShow(false);
                }}
              />
            )}
          </View>

          <View>
            <AppText
              style={[
                styles.label,
                transaction.category.isValid
                  ? {}
                  : { color: Colors.red, fontFamily: "Montserrat_600SemiBold" },
              ]}
            >
              Category
            </AppText>
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: transaction.category.isValid
                    ? "grey"
                    : Colors.red,
                },
              ]}
              placeholderStyle={[
                styles.dropdownText,
                {
                  color: "grey",
                  fontSize: 14,
                },
              ]}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              placeholder="e.g., Food, Rent, Salary"
              data={dropDownCategories}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={transaction.category.value}
              onChange={(item) => {
                handleInputChange("category", item.value);
              }}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <AppText style={styles.submitButtonText}>Save</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: FontSizes.large,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 20,
    textAlign: "center",
    flex: 1,
  },

  typesContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "grey",
    flex: 1,
  },
  typeText: {
    textAlign: "center",
    fontSize: FontSizes.medium,
  },
  activeType: {
    backgroundColor: "black",
    borderColor: "black",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontFamily: "Montserrat_500Medium",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
    marginVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  submitButton: {
    backgroundColor: "black",
    padding: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
