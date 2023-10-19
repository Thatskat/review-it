import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";
import { global } from "@apollo/client/utilities/globals";

export const profile = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
});

export const infoBox = style({
  border: `${variables.colors.secondary} 2px solid`,
  borderRadius: 20,
  padding: "1.5rem",
  width: "60%",
  marginLeft: "auto",
});
globalStyle(`${profile} h1`, {
  fontFamily: variables.fonts.brand,
  color: variables.colors.brand,
  fontSize: "4rem",
  marginRight: "auto",
});

globalStyle(`${profile}  button`, {
  display: "block",
  margin: "1rem auto"
});

export const reviewCard = style({
  background: variables.colors.secondary,
  width: "100%",
});
