import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../styles/themes.css";

export const commentCard = style({
    background: variables.colors.brand,
    padding: "0.5rem",
    margin: "0.5rem 0",
    borderRadius: 20
})