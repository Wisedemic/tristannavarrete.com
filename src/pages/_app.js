import React from 'react'
import App from 'next/app'
import { PageTransition } from 'next-page-transitions'
import styled from 'styled-components'
import Loader from '../components/PageLoaders/SVGLoader'
import Navigation from '../containers/Navigation'
import { BackTop, Icon } from 'antd'
import Router from 'next/router'
import withGA from 'next-ga'
import getConfig from 'next/config'
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
    const { Component, pageProps } = this.props
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
        <Navigation key="app-navigation">
          <Component key="app" {...pageProps} />
          <BackToTop>
            <Icon type="up" />
          </BackToTop>
        </Navigation>
      </PageTransition>
    )
  }
}

export default withGA(publicRuntimeConfig.GA_KEY, Router)(AppWrapper)
