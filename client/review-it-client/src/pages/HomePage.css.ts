import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const home = style({
  padding: "0 2rem",
  background: variables.colors.primary,
});
