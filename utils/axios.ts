import axios from "axios";
import { TransactionDetailsType } from "./types";

const FIREBASE_URL =
  "https://expense-tracker-d761d-default-rtdb.firebaseio.com";

export const createTransaction = async (
  transaction: TransactionDetailsType
) => {
  const response = await axios.post(
    `${FIREBASE_URL}/transactions.json`,
    transaction
  );
  return response.data.name;
};

export const fetchTransactions = async () => {
  const response = await axios.get(`${FIREBASE_URL}/transactions.json`);
  return response.data;
};

export const editTransaction = (
  id: string,
  transaction: TransactionDetailsType
) => {
  return axios.put(`${FIREBASE_URL}/transactions/${id}.json`, transaction);
};

export const deleteTransaction = (id: string) => {
  return axios.delete(`${FIREBASE_URL}/transactions/${id}.json`);
};
