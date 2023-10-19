import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const addShowPage = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
});

globalStyle(`${addShowPage} a`, {
  textTransform: "lowercase",
  color: variables.colors.brand,
});

globalStyle(`${addShowPage} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
});

globalStyle(`${addShowPage} form`, {
  height: "50vh",
});

globalStyle(`${addShowPage} form label`, {
  display: "none",
});

globalStyle(`${addShowPage} form input`, {
  textAlign: "start",
  display: "block",
  textTransform: "lowercase",
  width: "40rem",
  background: "#ffffff",
  margin: "1rem 0",
  marginRight: "auto",
  padding: "0.5rem",
  borderRadius: 20,
  border: `${variables.colors.secondary} 3px solid`,
  color: variables.colors.primary
})

globalStyle(`${addShowPage} form button`, {
  width: "10rem",
  marginTop: "1rem",
 marginRight: "0 !important"
})

globalStyle(`${addShowPage} .errorsGrid`, {
  margin: "auto",
  marginTop: "7.5rem"
})
