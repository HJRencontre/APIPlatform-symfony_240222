import "../styles/globals.css"
import Layout from "../components/common/Layout"
import type { AppProps } from "next/app"
import type { DehydratedState } from "react-query"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps<{dehydratedState: DehydratedState}>) {
  return <Layout dehydratedState={pageProps.dehydratedState}>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>My awesome PWA app</title>
      <meta name="description" content="Best PWA app in the world!" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="My awesome PWA app" />
      <meta name="twitter:description" content="Best PWA app in the world!" />
      <meta name="twitter:image" content="/icons/twitter.png" />
      <meta name="twitter:creator" content="@DavidWShadow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="My awesome PWA app" />
      <meta property="og:description" content="Best PWA app in the world!" />
      <meta property="og:site_name" content="My awesome PWA app" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:image" content="/icons/og.png" />
    </Head>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
