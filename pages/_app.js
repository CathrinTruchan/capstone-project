import GlobalStyle from "../components/GlobalStyle";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default MyApp;
