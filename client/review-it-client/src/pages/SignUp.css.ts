import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const signUpPage = style({
  background: variables.colors.primary,
  color: variables.colors.brand,
  padding: "2rem 4rem",
});

export const card = style({
  background: variables.colors.secondary,
  padding: "2rem",
  borderRadius: 20,
});

export const grid = style({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)"
})
globalStyle(`${signUpPage} h1`, {
  fontFamily: variables.fonts.brand,
  textAlign: "end",
  fontSize: "3.052rem",
  marginBottom: "1rem",
});

globalStyle(`${signUpPage} p`, {
  color: variables.colors.primary,
  textAlign: "end",
  marginBottom: "1rem",
});

globalStyle(`${signUpPage} form`, {
    justifySelf: "end"
  });

globalStyle(`${signUpPage} label`, {
  display: "none",
});

globalStyle(`${signUpPage} input`, {
    borderRadius: 20,
    padding: "0.5rem",
    display: "block",
    margin: "0.5rem 0rem",
    borderColor: variables.colors.brand,
    width: "55%",
    marginLeft: "auto"
  });
