import {
  ExpenseCategories,
  TransactionDetailsType,
  TransactionType,
} from "./types";

export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const validate = (
  field: keyof TransactionDetailsType,
  value: string | number | ExpenseCategories | TransactionType | Date
) => {
  switch (field) {
    case "name":
      return value.toString().trim().length > 0;
    case "amount":
      return typeof value === "number" && value > 0;
    case "date":
      return value instanceof Date && !isNaN(value.getTime());
    case "category":
      return value.toString().trim().length > 0;
    case "type":
      return value === "expense" || value === "income";
    default:
      return true;
  }
};
