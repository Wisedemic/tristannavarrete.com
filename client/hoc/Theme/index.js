import React, { Component } from 'react';
import { ThemeProvider, ThemeConsumer } from './ThemeContext';
export { ThemeProvider, ThemeConsumer };

// This is a component wrapper that passes in the Theme
export const withTheme = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <ThemeConsumer>
                {theme => (
                    <Page {...this.props} {...theme} />
                )}
            </ThemeConsumer>
        );
    }
}


export const ThemeWrapper = Page => class extends Component {
    static getInitialProps(props) {
        if (Page.getInitialProps) return Page.getInitialProps(props);
    }
    render() {
        return (
            <ThemeProvider>
                <Page {...this.props} />
            </ThemeProvider>
        );
    }
}
