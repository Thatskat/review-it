import { createGlobalTheme, createTheme } from "@vanilla-extract/css";

export const variables = createGlobalTheme(":root", {
  fonts: {
    brand: "",
    body: "Poppins, sans-serif",
  },
  colors: {
    primary: "#171717",
    secondary: "#DEDEDE",
    secondaryDark: "#EAEAEA",
    brand: "#fdba74",
    brandDark: "#fb923c",
    brandLight: "#fed7aa",
    brandSecondary: "#bef264",
    brandSecondaryDark: "#a3e635",
    brandSecondaryLight: "#d9f99d",
    brandThird: "#c4b5fd",
    brandThirdDark: "#a78bfa",
    brandThirdLight: "#ddd6fe",
  },
  space: {
    none: "0",
  },
});

export const [darkTheme, vars] = createTheme({
  colors: {
    primary: "#171717",
    secondary: "#f5f5f5",
  },
});

export const lightTheme = createTheme(vars, {
  colors: {
    primary: "#f5f5f5",
    secondary: "#171717",
  },
});
