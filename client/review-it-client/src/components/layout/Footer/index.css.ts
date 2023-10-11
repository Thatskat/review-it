import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const footer = style({
  borderTop: `${variables.colors.secondary} solid 1px`,
  background: variables.colors.primary,
  padding: "2rem 4rem",
  color: variables.colors.secondary,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  textAlign: "end"
});

globalStyle(`${footer} h4`, {
  color: variables.colors.secondary,
  fontFamily: variables.fonts.brand,
  textTransform: "lowercase"
});
globalStyle(`${footer} a`, {
   color: variables.colors.brand,
   textTransform: "lowercase",
   display: "block",
   fontSize: "0.8em",
   padding: "0.2rem 0"
  });
