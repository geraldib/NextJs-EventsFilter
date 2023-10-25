import Head from "next/head";
import Layout from "../components/layout/Layout";
import { NotificationContextProvider } from "../store/NotificationContext";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJs Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
};

export default App;
