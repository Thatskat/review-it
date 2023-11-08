import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const commentCard = style({
  background: variables.colors.secondary,
  border: `${variables.colors.brandDark} 1px solid`,
  borderRadius: 20,
  padding: "0.5rem",
  margin: "0.5rem 0"
});

globalStyle(`${commentCard} p`, {
    color: variables.colors.primary
})