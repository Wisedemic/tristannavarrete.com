import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import withGA from 'next-ga'
import getConfig from 'next/config'
import '../styles/global.scss'

const { publicRuntimeConfig } = getConfig()

class AppWrapper extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component key="app" {...pageProps} />
  }
}

export default withGA(publicRuntimeConfig.GA_KEY, Router)(AppWrapper)
