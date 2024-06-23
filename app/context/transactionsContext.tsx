import { AllTransactionsType, TransactionDetailsType } from "@/utils/types";
import { createContext, useReducer } from "react";
import { isEqual } from "lodash";

export const TransactionsContext = createContext<TransactionsContextType>({
  idToEdit: "",
  setIdToEdit: () => {},
  allTransactions: {},
  addTransaction: () => {},
  deleteTransaction: () => {},
  editTransaction: () => {},
  mode: "add",
  setMode: () => {},
});

const TransactionsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        allTransactions: {
          ...state.allTransactions,
          [action.payload.id]: action.payload,
        },
      };
    case "DELETE_TRANSACTION":
      const newTransactions = { ...state.allTransactions };
      delete newTransactions[action.payload];
      return {
        ...state,
        allTransactions: newTransactions,
      };
    case "EDIT_TRANSACTION":
      const oldTransaction = state.allTransactions[action.payload.id];
      if (oldTransaction && isEqual(oldTransaction, action.payload)) {
        return state;
      } else {
        return {
          ...state,
          allTransactions: {
            ...state.allTransactions,
            [action.payload.id]: action.payload,
          },
        };
      }
    case "SET_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    case "SET_TO_EDIT":
      return {
        ...state,
        idToEdit: action.payload,
      };
    default:
      return state;
  }
};

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactionState, dispatch] = useReducer(TransactionsReducer, {
    idToEdit: "",
    allTransactions: {},
    mode: "add",
  });

  const setIdToEdit = (transactionId: string) => {
    dispatch({ type: "SET_TO_EDIT", payload: transactionId });
  };

  const addTransaction = (transaction: TransactionDetailsType) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (transactionId: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
  };

  const editTransaction = (transaction: TransactionDetailsType) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: transaction });
  };

  const setMode = (mode: "edit" | "add") => {
    dispatch({ type: "SET_MODE", payload: mode });
  };

  const contextValue = {
    idToEdit: transactionState.idToEdit,
    setIdToEdit,
    allTransactions: transactionState.allTransactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
    mode: transactionState.mode,
    setMode,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;

type TransactionsContextType = {
  idToEdit: string;
  setIdToEdit: (transactionId: string) => void;
  allTransactions: AllTransactionsType;
  addTransaction: (transaction: TransactionDetailsType) => void;
  deleteTransaction: (transactionId: string) => void;
  editTransaction: (transaction: TransactionDetailsType) => void;
  mode: "edit" | "add";
  setMode: (mode: "edit" | "add") => void;
};

type State = {
  idToEdit: string;
  allTransactions: AllTransactionsType;
  mode: "edit" | "add";
};

type Action =
  | { type: "SET_TO_EDIT"; payload: string }
  | { type: "ADD_TRANSACTION"; payload: TransactionDetailsType }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "EDIT_TRANSACTION"; payload: TransactionDetailsType }
  | { type: "SET_MODE"; payload: "edit" | "add" };
