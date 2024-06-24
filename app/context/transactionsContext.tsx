import { AllTransactionsType, TransactionDetailsType } from "@/utils/types";
import { createContext, useReducer } from "react";

export const TransactionsContext = createContext<TransactionsContextType>({
  idToEdit: "",
  setIdToEdit: () => {},
  setTransactions: () => {},
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
          [action.payload.id]: action.payload.transaction,
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
      return {
        ...state,
        allTransactions: {
          ...state.allTransactions,
          [action.payload.id]: action.payload.transaction,
        },
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        allTransactions: action.payload,
      };

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

  const addTransaction = (id: string, transaction: TransactionDetailsType) => {
    dispatch({ type: "ADD_TRANSACTION", payload: { id, transaction } });
  };

  const editTransaction = (id: string, transaction: TransactionDetailsType) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: { id, transaction } });
  };

  const setTransactions = (transactions: AllTransactionsType) => {
    dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
  };

  const deleteTransaction = (transactionId: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
  };

  const setMode = (mode: "edit" | "add") => {
    dispatch({ type: "SET_MODE", payload: mode });
  };

  const contextValue = {
    idToEdit: transactionState.idToEdit,
    setIdToEdit,
    allTransactions: transactionState.allTransactions,
    addTransaction,
    setTransactions,
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
  setTransactions: (transactions: AllTransactionsType) => void;
  addTransaction: (id: string, transaction: TransactionDetailsType) => void;
  deleteTransaction: (transactionId: string) => void;
  editTransaction: (id: string, transaction: TransactionDetailsType) => void;
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
  | {
      type: "ADD_TRANSACTION";
      payload: { id: string; transaction: TransactionDetailsType };
    }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | {
      type: "EDIT_TRANSACTION";
      payload: { id: string; transaction: TransactionDetailsType };
    }
  | { type: "SET_MODE"; payload: "edit" | "add" }
  | { type: "SET_TRANSACTIONS"; payload: AllTransactionsType };
