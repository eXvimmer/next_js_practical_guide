import Document, { Head, Html, Main, NextScript } from "next/document";

class TheDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications" />
        </body>
      </Html>
    );
  }
}

export default TheDocument;
