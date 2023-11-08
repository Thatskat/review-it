import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const privacyPolicy = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  padding: "2rem 4rem",
});

globalStyle(`${privacyPolicy} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "4rem",
  margin: "1rem 0",
});

globalStyle(`${privacyPolicy} h2`, {
  fontFamily: variables.fonts.brand,
});

globalStyle(`${privacyPolicy} p`, {
  margin: `1rem 0`,
  color: variables.colors.brand,
});

globalStyle(`${privacyPolicy} a`, {
  color: variables.colors.highlight,
});

globalStyle(`${privacyPolicy} ul li`, {
  margin: "1rem",
  color: variables.colors.brand,
});

globalStyle(`${privacyPolicy} ul li:firstChild`, {
  marginTop: "0",
});

globalStyle(`${privacyPolicy} ul li svg`, {
  color: variables.colors.highlight,
});

globalStyle(`${privacyPolicy} .bold`, {
  fontWeight: "bold",
  color: variables.colors.highlight
})
