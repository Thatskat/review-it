import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const card = style({});

globalStyle(`${card} img`, {
  width: "10rem",
  border: `${variables.colors.secondary} 6px solid`,
  borderRadius: "20px",
});
