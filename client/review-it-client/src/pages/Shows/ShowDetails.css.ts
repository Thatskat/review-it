import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../styles/themes.css";

export const details = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
  gap: "1rem",
});

globalStyle(`${details} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
});

globalStyle(`${details} a`, {
  textTransform: "lowercase",
  color: variables.colors.brand,
});

globalStyle(`${details} .overview`, {
  margin: "1rem 0",
});

globalStyle(`${details} img`, {
  maxWidth: "10rem",
});

export const commentFieldSection = style({
  height: "60vh",
  overflowY: "scroll",
});

export const commentForm = style({
  border: `${variables.colors.brand} 5px solid`,
  borderRadius: 20,
  padding: "0.5rem",
  marginTop: "0.5rem",
});

globalStyle(`${commentForm} label`, {
  display: "none",
});
globalStyle(`${commentForm} input`, {
  width: "30rem",
  borderRadius: 20,
  padding: "0.5rem",
  margin: `0 0.5rem`,
  border: `${variables.colors.secondary} 5px solid`,
});
