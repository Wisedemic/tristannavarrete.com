import React, { Component } from 'react';
import { InternetStatusProvider, InternetStatusConsumer } from './InternetStatusContext';
export { InternetStatusProvider, InternetStatusConsumer };

// This is a component wrapper that passes in the internetStatus
export const withInternetStatus = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <InternetStatusConsumer>
                {internetStatus => (
                    <Page {...this.props} {...internetStatus} />
                )}
            </InternetStatusConsumer>
        );
    }
}


export const InternetStatusWrapper = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <InternetStatusProvider>
                <Page {...this.props} />
            </InternetStatusProvider>
        );
    }
}
