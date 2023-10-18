import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const header = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  padding: "2rem 4rem",
  background: variables.colors.primary,
});
globalStyle(`${header} .navLinks`, {
  justifySelf: "end"
});
globalStyle(`${header} .navLinks ul li`, {
  display: "inline",
 
});
globalStyle(`${header} .navLinks ul li a`, {
  color: variables.colors.secondary,
  textTransform: "lowercase",
  margin: "auto 1rem",
  fontFamily: variables.fonts.brand
});

export const displayName = style({
 
});

globalStyle(`${displayName} a p`, {
  color: variables.colors.brand,
  fontFamily: variables.fonts.brand
})
