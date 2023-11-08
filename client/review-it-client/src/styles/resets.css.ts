import { globalStyle } from "@vanilla-extract/css";
import { variables } from "./themes.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  fontFamily: variables.fonts.body,
  overflowX: "hidden",
});

globalStyle("a", {
  textDecoration: "none",
});

globalStyle("button", {
  background: variables.colors.brand,
  textTransform: "lowercase",
  border: "none",
  borderRadius: 20,
  padding: "0.5rem",
  width: "10rem",
  fontFamily: variables.fonts.brand,
  color: variables.colors.secondary,
  transition: "all 1s ease-in",
});

globalStyle("button:hover", {
  background: variables.colors.brandDark,
  color: variables.colors.brand,
});

globalStyle("span", {
  display: "block",
  background: variables.colors.secondary,
  width: "40rem",
  color: variables.colors.primary,
  padding: "0.2rem",
  textTransform: "lowercase",
  marginRight: "auto",
  textAlign: "start",
  marginTop: "0.5rem",
});

globalStyle("input:focus", {
  outline: "none",
});

globalStyle("::-webkit-scrollbar-track", {
  background: variables.colors.primary,
});

globalStyle("::-webkit-scrollbar", {
  width: 10,
  margin: "1rem"
});

globalStyle("::-webkit-scrollbar-thumb", {
  background: variables.colors.secondary,
  borderRadius: 20
})
