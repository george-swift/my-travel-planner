import NextHead from "next/head";
import { string } from "prop-types";

const defaultContent = "";
const ogImage = "/travel-pick.webp";

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultContent}</title>
    <meta name="description" content="Personal Travel Planner" />
    <link rel="icon" href="/favicon/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <meta property="og:image" content={ogImage} />
  </NextHead>
);

Head.proptypes = { title: string };

export default Head;
