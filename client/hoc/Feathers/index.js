import React, { Component } from 'react';
import { FeathersProvider, FeathersConsumer } from './Feathers';
export { FeathersProvider, FeathersConsumer };

// This is a Component wrapper that passes in the feathers client
export const withFeathers = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <FeathersConsumer>
                {feathers => (
                    <Page {...this.props} {...feathers} />
                )}
            </FeathersConsumer>
        );
    }
}


export const FeathersWrapper = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <FeathersProvider>
                <Page {...this.props} />
            </FeathersProvider>
        );
    }
}
