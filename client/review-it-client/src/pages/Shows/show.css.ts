import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../styles/themes.css";

export const showsPage = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${showsPage} .headerSection`, {
    display: "grid",
    gridTemplateColumns: "repeat(2, 2fr)",
  });

globalStyle(`${showsPage} .headerSection h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
  textAlign: "end"
});

globalStyle(`${showsPage} .headerSection p`, {
  color: variables.colors.brand,
  textTransform: "lowercase",
  fontWeight: "bold",
  textAlign: "end"
});

export const showsGrid = style({
    display: "grid",
    gridTemplateColumns: "repeat(7, 2fr)",
    margin: "1rem auto",
})


