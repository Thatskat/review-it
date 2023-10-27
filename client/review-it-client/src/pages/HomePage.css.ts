import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const home = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
  padding: "2rem 4rem",
});

globalStyle(`${home} img`, {
  width: "30%",
});

globalStyle(`${home} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "7.594rem",
  textAlign: "end",
});

globalStyle(`${home} p`, {
  color: variables.colors.brand,
  textAlign: "end",
  textTransform: "lowercase",
  padding: `2rem 0rem`,
  fontWeight: "bold",
});

export const blob = style({
  width: "25rem !important",
  position: "absolute",
  zIndex: "0",
});

export const reviewHighlight = style({});

globalStyle(`${reviewHighlight} div`, {
  background: variables.colors.primary,
  border: `${variables.colors.secondary} 5px solid`,
  position: "absolute",
  zIndex: "1",
})