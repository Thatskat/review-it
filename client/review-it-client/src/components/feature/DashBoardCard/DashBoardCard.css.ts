import { style } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const card = style({
    border: `${variables.colors.secondary} 2px solid`,
    margin: `0.5rem`,
    padding: `1rem`
})