import { style, globalStyle } from "@vanilla-extract/css";
import { variables } from "../styles/themes.css";

export const home = style({
  background: variables.colors.primary,
  color: variables.colors.secondary,
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
  padding: "2rem 4rem",
});

globalStyle(`${home} img`, {
  width: "30%",
});

globalStyle(`${home} h1`, {
  fontFamily: variables.fonts.brand,
  fontSize: "7.594rem",
  textAlign: "end",
});

globalStyle(`${home} p`, {
  color: variables.colors.brand,
  textAlign: "end",
  textTransform: "lowercase",
  padding: `2rem 0rem`,
  fontWeight: "bold",
});

export const blob = style({
  width: "25rem !important",
  position: "absolute",
  zIndex: "0",
});

export const reviewHighlight = style({});

globalStyle(`${reviewHighlight} #primaryBlob`, {
  top: "1rem",
  left: "-1rem",
});

globalStyle(`${reviewHighlight} #secondaryBlob`, {
  top: "15rem",
  left: "-1rem",
});
globalStyle(`${reviewHighlight} #thirdBlob`, {
  top: "12rem",
  left: "20rem",
});
globalStyle(`${reviewHighlight} #forthBlob`, {
  top: "-1rem",
  left: "25rem",
});

globalStyle(`${reviewHighlight} .reviewCard`, {
  background: variables.colors.primary,
  border: `${variables.colors.secondary} 5px solid`,
  position: "absolute",
  zIndex: "1",
  borderRadius: 20,
  display: "grid",
  gridTemplateColumns: "repeat(2, 2fr)",
  width: "40%",
});

globalStyle(`${reviewHighlight} .reviewCard img`, {
  width: "15rem",
});

globalStyle(`${reviewHighlight} .reviewCard .reviewText`, {
  padding: "2rem",
  marginLeft: "-4rem"
});

globalStyle(`${reviewHighlight} .reviewCard .reviewText h2`, {
fontSize: "2rem"
});


globalStyle(`${reviewHighlight} .reviewCard .reviewText a`, {
 fontWeight: "bold",
 color: variables.colors.brand,
 display: "block",
 margin: "0.5rem 0"
});
