/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  mainColor: "#ACCC51",
  text: "#fff",
  grayText: "#858585",
  lightGray: "#f5f5f5",
  red: "#BA0000",
  green: "green",
  transparentGreen: "#E7FADF",
  transparentRed: "#FFE3E3",
};

export const IconSizes = {
  small: 20,
  medium: 28,
  large: 48,
};

export const FontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

export const dropDownCategories = [
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

const transactionData = [
  {
    category: "Entertainment",
    name: "Movie at Silverbird Cinemas",
    amount: 3000,
    date: "12th August",
    type: "expense",
  },
  {
    category: "Food & Dining",
    name: "Dinner at Nkoyo",
    amount: 8000,
    date: "13th August",
    type: "expense",
  },
  {
    category: "Transportation",
    name: "BRT Bus Ride",
    amount: 500,
    date: "14th August",
    type: "expense",
  },
  {
    category: "Shopping",
    name: "Books at Terra Kulture",
    amount: 5000,
    date: "15th August",
    type: "expense",
  },
  {
    category: "Income",
    name: "Etsy Store Sales",
    amount: 15000,
    date: "16th August",
    type: "income",
  },
  {
    category: "Entertainment",
    name: "Art Class at Nike Art Gallery",
    amount: 7000,
    date: "17th August",
    type: "expense",
  },
  {
    category: "Food & Dining",
    name: "Brunch at Café Neo",
    amount: 3500,
    date: "18th August",
    type: "expense",
  },
  {
    category: "Transportation",
    name: "Taxify Ride",
    amount: 2000,
    date: "19th August",
    type: "expense",
  },
  {
    category: "Shopping",
    name: "Ankara Fabrics at Balogun Market",
    amount: 6000,
    date: "20th August",
    type: "expense",
  },
  {
    category: "Income",
    name: "Tutoring Income",
    amount: 5000,
    date: "21st August",
    type: "income",
  },
  {
    category: "Entertainment",
    name: "Visit to Lekki Conservation Centre",
    amount: 3000,
    date: "22nd August",
    type: "expense",
  },
  {
    category: "Food & Dining",
    name: "Lunch at Yellow Chilli",
    amount: 4500,
    date: "23rd August",
    type: "expense",
  },
  {
    category: "Transportation",
    name: "Bike Ride with Gokada",
    amount: 800,
    date: "24th August",
    type: "expense",
  },
  {
    category: "Shopping",
    name: "New Phone at Computer Village",
    amount: 150000,
    date: "25th August",
    type: "expense",
  },
  {
    category: "Income",
    name: "Salary from Work",
    amount: 80000,
    date: "26th August",
    type: "income",
  },
  {
    category: "Entertainment",
    name: "Concert at Freedom Park",
    amount: 5000,
    date: "27th August",
    type: "expense",
  },
  {
    category: "Food & Dining",
    name: "Dinner at Sky Restaurant & Lounge",
    amount: 10000,
    date: "28th August",
    type: "expense",
  },
  {
    category: "Transportation",
    name: "Boat Ride at Five Cowries Terminal",
    amount: 2500,
    date: "29th August",
    type: "expense",
  },
  {
    category: "Shopping",
    name: "Groceries at Spar",
    amount: 15000,
    date: "30th August",
    type: "expense",
  },
  {
    category: "Income",
    name: "Freelance Design Work",
    amount: 20000,
    date: "31st August",
    type: "income",
  },
];
