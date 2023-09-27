import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../../../styles/themes.css";

export const header = style({
  padding: "2rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  background: variables.colors.primary,
  color: variables.colors.secondary,
});

export const navbar = style({});

globalStyle(`${navbar} ul`, {
  display: "flex",
  justifyContent: "space-evenly",
  listStyle: "none",
});

globalStyle(`${navbar} ul li`, {
  padding: "0 1.5rem",
});

globalStyle(`${navbar} ul li a`, {
  color: variables.colors.secondary,
  fontWeight: "600",
  transition: "ease-in 0.4s all"
});

globalStyle(`${navbar} ul li a:hover`, {
  color: variables.colors.secondaryDark,
});

export const searchBox = style({});

globalStyle(`${searchBox} label`, {
  display: "none",
});

globalStyle(`${searchBox} input`, {
    padding: "0.5rem",
    borderRadius: "15px",
    fontFamily: variables.fonts.body,
    background: variables.colors.secondary,
    color: variables.colors.primary
  });