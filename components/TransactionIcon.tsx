import { View, Text } from "react-native";
import { ExpenseCategories } from "@/constants/types";

interface TransactionIconProps {
  category: ExpenseCategories;
}

const TransactionIcon: React.FC<TransactionIconProps> = ({ category }) => {
  let emoji: string;

  switch (category) {
    case "food":
      emoji = "🍔";
      break;
    case "transportation":
      emoji = "🚌";
      break;
    case "housing":
      emoji = "🏠";
      break;
    case "utilities":
      emoji = "⚡️";
      break;
    case "healthcare":
      emoji = "🏥";
      break;
    case "entertainment":
      emoji = "🎵";
      break;
    case "shopping":
      emoji = "🛍️";
      break;
    case "education":
      emoji = "🎓";
      break;
    case "investments":
      emoji = "📈";
      break;
    case "income":
      emoji = "💰";
      break;
    default:
      emoji = "⚠️";
  }

  return (
    <View>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
  );
};

export default TransactionIcon;
