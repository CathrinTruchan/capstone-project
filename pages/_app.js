import GlobalStyle from "../components/GlobalStyle";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [flowAsanaIds, setFlowAsanaIds] = useState([]);
  const [selectedAsanaIds, setSelectedAsanaIds] = useState([]);
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        flowAsanaIds={flowAsanaIds}
        setFlowAsanaIds={setFlowAsanaIds}
        selectedAsanaIds={selectedAsanaIds}
        setSelectedAsanaIds={setSelectedAsanaIds}
      />
    </>
  );
}

export default MyApp;
