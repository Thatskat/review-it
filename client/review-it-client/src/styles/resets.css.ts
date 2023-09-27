import { globalStyle } from "@vanilla-extract/css";
import { variables } from "./themes.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  fontFamily: variables.fonts.body
});

globalStyle("a", {
  textDecoration: "none",
});
