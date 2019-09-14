import React from 'react'
import App from 'next/app'
import { PageTransition } from 'next-page-transitions'
import styled from 'styled-components'
import Loader from '../components/PageLoaders/SVGLoader'
import Navigation from '../containers/Navigation'
import Toast from '../components/Toast'
import { BackTop, Icon } from 'antd'
import Router from 'next/router'
import withGA from 'next-ga'
import getConfig from 'next/config'

import { InternetStatusWrapper, withInternetStatus } from '../hoc/InternetStatus/'
import '../styles/global.scss'
const { publicRuntimeConfig } = getConfig()

const BackToTop = styled(BackTop)`
  background-color: white;
  width: unset;
  height: unset;
  border-radius: 4px;
  box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  i {
    padding: 0.5rem;
    font-size: 20px;
  }
`

class AppWrapper extends App {
  render() {
    const { Component, pageProps, internetStatus } = this.props
    return (
      <PageTransition
        classNames="page-transition"
        loadingComponent={<Loader />}
        timeout={150}
        loadingDelay={300}
        loadingTimeout={{
          enter: 150,
          exit: 0
        }}
        loadingClassNames="loading-indicator"
      >
        {/* We add Providers at this level! */}
        <Navigation key="app-navigation">
          {!internetStatus && (
            <Toast key="internet-status-toast">
              <p className="control">No Internet Connection Detected...</p>
              {/* <img src={require('static/loader.gif')} alt="Loading..." />  */}
            </Toast>
          )}
          <Component key="app" {...pageProps} />
          <BackToTop>
            <Icon type="up" />
          </BackToTop>
        </Navigation>
      </PageTransition>
    )
  }
}

// Wrapper hell is contained here.
export default InternetStatusWrapper(withInternetStatus(withGA(publicRuntimeConfig.GA_KEY, Router)(AppWrapper)))
