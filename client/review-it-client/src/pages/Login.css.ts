import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const loginPage = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
});

globalStyle(`${loginPage} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "7.594rem",
  textAlign: "end",
});

globalStyle(`${loginPage} p`, {
  color: variables.colors.brand,
  textAlign: "end",
  textTransform: "lowercase",
  fontWeight: "bold",
  marginBottom: "1rem"
});

globalStyle(`${loginPage} form`, {
  marginLeft: "auto",
  textAlign: "end",
});

globalStyle(`${loginPage} form label`, {
  display: "none",
});
globalStyle(`${loginPage} form input`, {
  textAlign: "end",
  display: "block",
  textTransform: "lowercase",
  width: "18.5rem",
  background: "#ffffff",
  margin: "1rem 0",
  marginLeft: "auto",
  padding: "0.5rem",
  borderRadius: 20,
  border: `${variables.colors.secondary} 3px solid`
});

