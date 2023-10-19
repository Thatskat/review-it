import { createGlobalTheme} from "@vanilla-extract/css";

export const variables = createGlobalTheme(":root", {
  fonts: {
    brand: "Pixelify Sans, cursive",
    body: "Poppins, sans-serif",
  },
  colors: {
    primary: "#190019",
    secondary: "#DFB6B2",
    brand: "#854F6C",
    brandDark: "#522B5B",
    highlight: "#F39F5A"

  },
  space: {
    none: "0",
  },
});


