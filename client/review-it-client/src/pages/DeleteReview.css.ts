import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const deleteReview = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${deleteReview} a`, {
  textTransform: "lowercase",
  color: variables.colors.brand,
});

globalStyle(`${deleteReview} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
  margin: "1rem 0",
});

export const reviewGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 2fr)",
});
