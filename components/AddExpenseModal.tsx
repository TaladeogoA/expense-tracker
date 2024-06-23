import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { IconSizes } from "@/utils/constants";

const categoriesData = [
  {
    label: "Food & Dining",
    value: "food",
  },
  {
    label: "Transportation",
    value: "transportation",
  },
  {
    label: "Housing",
    value: "housing",
  },
  {
    label: "Utilities",
    value: "utilities",
  },
  {
    label: "Healthcare",
    value: "healthcare",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "Shopping",
    value: "shopping",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Investments",
    value: "investments",
  },
  {
    label: "Income",
    value: "income",
  },
];

const AddExpenseModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: any;
}) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("expense");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <AppText style={styles.headerText}>Add Transaction</AppText>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                height: 35,
                width: 35,
              }}
            >
              <Ionicons
                name="close-outline"
                size={IconSizes.small}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.typesContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "expense" ? styles.activeType : {},
                  {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  },
                ]}
                onPress={() => setType("expense")}
              >
                <AppText
                  style={[
                    styles.typeText,
                    { color: type === "income" ? "black" : "white" },
                  ]}
                >
                  Expense
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "income" ? styles.activeType : {},
                  {
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}
                onPress={() => setType("income")}
              >
                <AppText
                  style={[
                    styles.typeText,
                    {
                      color: type === "expense" ? "black" : "white",
                    },
                  ]}
                >
                  Income
                </AppText>
              </TouchableOpacity>
            </View>
            <TextInput placeholder="Name" style={styles.textInput} />
            <TextInput placeholder="Amount" style={styles.textInput} />
            <Dropdown
              style={styles.dropdown}
              data={categoriesData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                padding: 15,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <AppText style={{ color: "white" }}>Save</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 20,
    textAlign: "left",
  },
  typesContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "grey",
    flex: 1,
  },
  typeText: {
    textAlign: "center",
    fontSize: 14,
  },
  activeType: {
    backgroundColor: "black",
    borderColor: "black",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 10,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
});
