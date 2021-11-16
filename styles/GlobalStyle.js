import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const { colors, fonts, transition } = theme;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${fonts.inter};
    color: ${colors.darkGrey};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  h2 {
    line-height: 1.2;
    letter-spacing: -1px;
    color: ${colors.grey};
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    transition: ${transition};
    color: ${colors.blue};
    display: inline-block;

    &:hover {
      color: ${colors.lightBlue}
    }
  }

  ::-webkit-input-placeholder {
    font-family: ${fonts.inter};
  }

  :-moz-placeholder {
      font-family: ${fonts.inter};
  }

  ::-moz-placeholder {
      font-family: ${fonts.inter};
  }

  :-ms-input-placeholder {
      font-family: ${fonts.inter};
  }
`;

export default GlobalStyle;
