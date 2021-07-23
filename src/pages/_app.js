import React, { Fragment } from 'react'
import App from 'next/app'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import Router from 'next/router'
import withGA from 'next-ga'
import getConfig from 'next/config'
import theme from '../lib/theme'
import '../styles/global.scss'

const { publicRuntimeConfig } = getConfig()

function TristanNavarreteApp(props) {
  const { Component, pageProps } = props
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <Component key="app" {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Fragment>
  )
}

TristanNavarreteApp.getInitialProps = async function (_appContext) {
  const appProps = await App.getInitialProps(_appContext)
  return { ...appProps }
}

export default withGA(publicRuntimeConfig.GA_KEY, Router)(TristanNavarreteApp)
