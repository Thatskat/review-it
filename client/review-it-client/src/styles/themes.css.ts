import { createGlobalTheme} from "@vanilla-extract/css";

export const variables = createGlobalTheme(":root", {
  fonts: {
    brand: "Pixelify Sans, cursive",
    body: "Poppins, sans-serif",
  },
  colors: {
    primary: "#1D1A38",
    secondary: "#E8BCB9",
    brand: "#AE445A",
    brandDark: "#662549",
    highlight: "#F39F5A"

  },
  space: {
    none: "0",
  },
});


