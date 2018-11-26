import React from 'react';

// Global Styles
import '../styles/global.scss';

import App, { Container } from 'next/app';

// Page Transitions
import { PageTransition } from 'next-page-transitions';

// Layout
import Loader from '../components/Loader/';
import Header from '../components/Header/';
import Footer from '../components/Footer/';

// Widgets
import Toast from '../components/Toast';

// Higher-Order Components
import { ThemeWrapper } from '../hoc/Theme';
import { InternetStatusWrapper, withInternetStatus } from '../hoc/InternetStatus/';
import { FeathersWrapper } from '../hoc/Feathers/';

class AppWrapper extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, internetStatus } = this.props;
        return (
            <Container>
                {/* We add Providers at this level! */}
                <PageTransition
                    classNames='page-transition'
                    loadingComponent={<Loader />}
                    timeout={150}
                    loadingDelay={300}
                    loadingTimeout={{
                        enter: 150,
                        exit: 0
                    }}
                    loadingClassNames='loading-indicator'
                >
                    <React.Fragment>
                        {!internetStatus &&
                            <Toast>
                                <p className="control">No Internet Connection Detected...</p>
                                {/* <img src={require('images/loader.gif')} alt="Loading..." />  */}
                            </Toast>
                        }
                        <Header />
                        <div className="content-wrapper">
                            <Component {...pageProps} />
                        </div>
                        <Footer />
                    </React.Fragment>
                </PageTransition>
            </Container>
        )
    }
}

// Wrapper hell is contained here.
export default FeathersWrapper(
    InternetStatusWrapper(withInternetStatus(
        ThemeWrapper(
            AppWrapper
        )
    ))
);