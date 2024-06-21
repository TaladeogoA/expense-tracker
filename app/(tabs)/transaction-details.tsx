import AppText from "@/components/AppText";
import {
  FontSizes,
  IconSizes,
  dropDownCategories,
} from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
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
import { ExpenseCategories, TransactionDetailsType } from "@/constants/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const TransactionDetails = () => {
  const { idToEdit, mode, editTransaction, addTransaction, allTransactions } =
    useContext(TransactionsContext);
  let selectedTransaction: TransactionDetailsType | null =
    allTransactions[idToEdit];

  const [inputCategory, setInputCategory] = useState<ExpenseCategories>("food");
  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputType, setInputType] = useState<"expense" | "income">("expense");
  const [inputDate, setInputDate] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedTransaction) {
      setInputCategory(selectedTransaction.category);
      setInputName(selectedTransaction.name || "");
      setInputAmount(
        selectedTransaction.amount ? selectedTransaction.amount.toString() : ""
      );
      setInputType(selectedTransaction.type || "expense");
      setInputDate(selectedTransaction.date || "");
    }
  }, [selectedTransaction]);

  const resetForm = () => {
    setInputCategory("food");
    setInputName("");
    setInputAmount("");
    setInputType("expense");
    setInputDate("");
    selectedTransaction = null;
  };

  const handleSave = () => {
    const transaction = {
      id: mode === "edit" ? idToEdit : uuidv4(),
      category: inputCategory,
      name: inputName,
      amount: Number(inputAmount),
      date: inputDate,
      type: inputType,
    };
    if (mode === "edit") {
      editTransaction(transaction);
    } else {
      addTransaction(transaction);
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
                inputType === "expense" ? styles.activeType : {},
                {
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
              onPress={() => setInputType("expense")}
            >
              <AppText
                style={[
                  styles.typeText,
                  { color: inputType === "expense" ? "white" : "black" },
                ]}
              >
                Expense
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                inputType === "income" ? styles.activeType : {},
                {
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
              onPress={() => setInputType("income")}
            >
              <AppText
                style={[
                  styles.typeText,
                  {
                    color: inputType === "expense" ? "black" : "white",
                  },
                ]}
              >
                Income
              </AppText>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={inputName}
            onChangeText={setInputName}
          />
          <TextInput
            placeholder="Amount"
            style={styles.textInput}
            value={inputAmount}
            onChangeText={setInputAmount}
          />
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={[
              styles.textInput,
              {
                paddingVertical: 20,
              },
            ]}
          >
            <AppText>{inputDate ? inputDate : "Select Date"}</AppText>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || new Date();
                setInputDate(currentDate.toDateString());
                setShow(false);
              }}
            />
          )}
          <Dropdown
            style={styles.dropdown}
            data={dropDownCategories}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={inputCategory}
            onChange={(item) => {
              // @ts-ignore
              setInputCategory(item.value);
            }}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <AppText style={{ color: "white", fontSize: 16 }}>Save</AppText>
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
    marginBottom: 10,
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
    fontSize: 16,
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
    fontSize: 16,
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
  submitButton: {
    backgroundColor: "black",
    padding: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
