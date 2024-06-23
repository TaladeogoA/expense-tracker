export type ExpenseCategories =
  | "food"
  | "transportation"
  | "housing"
  | "utilities"
  | "healthcare"
  | "entertainment"
  | "shopping"
  | "education"
  | "investments"
  | "income";

export type TransactionType = "expense" | "income";

export type AllTransactionsType = {
  [key: string]: TransactionDetailsType;
};

export type TransactionDetailsType = {
  id: string;
  category: ExpenseCategories;
  name: string;
  amount: number;
  date: Date;
  type: TransactionType;
};
