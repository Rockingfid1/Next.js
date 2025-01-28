import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import LoadingContextProvider from "../store/loading-context";

function MyApp({ Component, pageProps }) {
  return (
    <LoadingContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoadingContextProvider>
  );
}

export default MyApp;
