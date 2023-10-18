import { globalStyle } from "@vanilla-extract/css";
import { variables } from "./themes.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  fontFamily: variables.fonts.body,
  overflowX: "hidden"
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
  width: "6rem",
  margin: "1rem auto",
  fontFamily: variables.fonts.brand,
  color: variables.colors.secondary
})
