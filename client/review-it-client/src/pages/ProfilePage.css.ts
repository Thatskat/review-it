import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const profile = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const infoBox = style({
  border: `${variables.colors.secondary} 2px solid`,
  borderRadius: 20,
  padding: "1.5rem",
  width: "20rem",
  marginLeft: "auto",
  height: "40vh"
});
globalStyle(`${profile} h1`, {
  fontFamily: variables.fonts.brand,
  color: variables.colors.brand,
  fontSize: "4rem",
  marginRight: "auto",
});

globalStyle(`${profile}  button`, {
  display: "block",
  margin: "1rem auto",
});

export const reviewBox = style({
  maxHeight: "60vh",
  minHeight: "60vh",
  overflowY: "scroll",
});

export const reviewOverview = style({

});

globalStyle(`${reviewOverview} h2`, {
  fontFamily: variables.fonts.brand,
})