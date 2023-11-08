import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../styles/themes.css";

export const commentCard = style({
  background: variables.colors.brand,
  padding: "0.5rem",
  margin: "0.5rem 0",
  borderRadius: 20,
});

export const userLinks = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  margin: 0
});

globalStyle(`${userLinks} a button`, {
    background: variables.colors.primary
})

globalStyle(`${userLinks} button`, {
    background: variables.colors.primary
})

globalStyle(`${userLinks} button:hover`, {
    background: variables.colors.primary
})

globalStyle(`${commentCard} a`, {
  color: variables.colors.primary,
  fontWeight: "bold",
});
