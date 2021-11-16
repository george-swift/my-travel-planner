import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../styles";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => ({
  pageProps: {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  },
});

export default MyApp;
