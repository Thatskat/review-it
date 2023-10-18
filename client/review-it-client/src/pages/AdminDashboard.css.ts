import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const dashboard = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${dashboard} h1`, {
    fontFamily: variables.fonts.brand,
    fontSize: "4rem",
})

globalStyle(`${dashboard} .subHeading`, {
    color: variables.colors.brand,
    textTransform: "lowercase",
    fontWeight: "bold"
})

globalStyle(`${dashboard} .dashboardGrid`, {
    display: "grid",
    gridTemplateColumns: "repeat(3, 2fr)",
    margin: '1rem auto'
})
