import type { AppProps } from 'next/app'
import Head from 'next/head'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste de Personalidade Big Five</title>
        <meta name="description" content="Descubra sua personalidade com o modelo Big Five (OCEAN)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}