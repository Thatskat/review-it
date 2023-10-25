import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../styles/themes.css";

export const showCard = style({
    background: variables.colors.secondary,
    borderRadius: 20,
  });
  
  globalStyle(`${showCard} img`, {
    maxWidth: "10rem",
  });
  