import React, { Component } from 'react';
import { InternetStatusProvider, InternetStatusConsumer } from './InternetStatusContext';
export { InternetStatusProvider, InternetStatusConsumer };

// This is a component wrapper that passes in the internetStatus
export const withInternetStatus = Component => class extends Component {
    static getInitialProps(props) {
        if (Component.getInitialProps) return Component.getInitialProps(props);
    }
    render() {
        return (
            <InternetStatusConsumer>
                {internetStatus => (
                    <Component {...this.props} {...internetStatus} />
                )}
            </InternetStatusConsumer>
        );
    }
}


export const InternetStatusWrapper = Component => class extends Component {
    static getInitialProps(props) {
        if (Component.getInitialProps) return Component.getInitialProps(props);
    }
    render() {
        return (
            <InternetStatusProvider>
                <Component {...this.props} />
            </InternetStatusProvider>
        );
    }
}
