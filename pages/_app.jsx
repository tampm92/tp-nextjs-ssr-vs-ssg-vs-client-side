import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

import { GlobalProvider } from '@/shared/contexts/GlobalContext'
import LayoutDefault from '@/layouts/default'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// import styles
import '@/assets/styles/tailwind.css'
import '@/assets/styles/globals.scss'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    let comment = document.createComment(`
=========================================================
* TP NextJS
=========================================================

* Website: https://tampm.com
=========================================================
    `)
    document.insertBefore(comment, document.documentElement)
  }, [])

  const Layout = Component.layout || LayoutDefault

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>👨🏽‍💻 tampm - NextJS - demo</title>

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#00C58E" />
        <link
          rel="shortcut icon"
          href='/favicon.ico'
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/apple-icon-167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120.png"
        />
      </Head>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </React.Fragment>
  )
}

export default MyApp
