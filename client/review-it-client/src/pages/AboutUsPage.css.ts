import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const aboutUs = style({
  background: variables.colors.primary,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${aboutUs} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "7.594rem",
  textAlign: "end",
});

globalStyle(`${aboutUs} p`, {
    fontFamily: variables.fonts.body,
    textTransform: "lowercase",
    textAlign: "end",
  });

  export const highlightedText = style({
    color: variables.colors.brand,
    textAlign: "end",
    textTransform: "lowercase",
    padding: `2rem 0rem`,
    fontWeight: "bold",
    overflow: ""
  })

  export const blob = style({
    position: "absolute"
  })
