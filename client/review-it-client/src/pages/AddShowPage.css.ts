import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const addShowPage = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem"
});
