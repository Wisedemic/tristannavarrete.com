import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // Setup Documents props, getting the render ctx from the server
  static async getInitialProps(ctx) {
    // Generate SSR styled-components Context
    const sheet = new ServerStyleSheet()

    // Get the page to be rendered
    const originalRenderPage = ctx.renderPage

    // Render the page with all available styled-components found.
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

    // Fetch inital Props
    const initialProps = await Document.getInitialProps(ctx)

    // Merge and return propsList
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="title" content="Tristan Navarrete - Full Stack Developer" />
          <meta
            name="description"
            content="I build fast, powerful, and interactive Full Stack solutions for your business using cutting-edge technologies."
          />
          <meta
            name="keywords"
            content="Full Stack, Developer, Portfolio, Website, Hire, Node.js, React, WordPress, MERN, LAMP"
          />
          <meta name="author" content="Tristan Navarrete" />
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
          <meta name="google-site-verification" content="fukXxAm9zd-WRpn8sL9dOJM52j69ZC4WqQ0f-T5AooY" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
