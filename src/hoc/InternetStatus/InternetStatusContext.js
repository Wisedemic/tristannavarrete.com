import React, { Component, createContext } from 'react';

// Create our context
const Context = createContext();

export const InternetStatusConsumer = Context.Consumer;

export class InternetStatusProvider extends Component {

    state = { status: false };

    checkStatus = () => {
        if (window.navigator.onLine) {
            this.setState({ status: true });
        } else {
            this.setState({ status: false });
        }
    }

    componentDidMount() {
        window.addEventListener('online', this.checkStatus);
        window.addEventListener('offline', this.checkStatus);
        this.checkStatus();
    }

    componentWillUnmount() {
        window.removeEventListener('offline', this.checkStatus);
        window.removeEventListener('online', this.checkStatus);
    }

    render() {
        return (
            <Context.Provider value={{ internetStatus: this.state.status }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}