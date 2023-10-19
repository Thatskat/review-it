import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const deletePage = style({
    background: variables.colors.primary,
    color: variables.colors.secondary,
    padding: "2rem 4rem",
})

globalStyle(`${deletePage} a`, {
    textTransform: "lowercase",
    color: variables.colors.brand,
  });
  
  globalStyle(`${deletePage} h1`, {
    fontFamily: variables.fonts.brand,
    fontSize: "4rem",
    margin: "1rem 0"
  });