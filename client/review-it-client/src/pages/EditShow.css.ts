import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";
import { global } from "@apollo/client/utilities/globals";

export const showOverview = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${showOverview} .dashboardLink`, {
  textTransform: "lowercase",
  color: variables.colors.brand,
});

globalStyle(`${showOverview} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
});

export const showsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 2fr)",
  margin: "1rem auto",
  gap: "1rem",
});

export const showCard = style({
  background: variables.colors.secondary,
  borderRadius: 20,
});

globalStyle(`${showCard} img`, {
  maxWidth: "10rem",
});
