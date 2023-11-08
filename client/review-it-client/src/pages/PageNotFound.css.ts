import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const pageNotFound = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  minHeight: "62vh",
});

globalStyle(`${pageNotFound} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
  margin: "1rem 0",
});

globalStyle(`${pageNotFound} p`, {
  textTransform: "lowercase",
  fontWeight: "bold",
  color: variables.colors.brand,
});

globalStyle(`${pageNotFound} a`, {
  color: variables.colors.highlight,
});
