import React, { Component, createContext } from 'react';
import isSSR from '../../utils/isSSR';

// Socket io / client-side
import io from 'socket.io-client';

// Import the feathers client
import feathers from '@feathersjs/client';

// Authentication methods
import authentication from '@feathersjs/authentication-client';

// Socket.IO Bindings for Feathers
import socketio from '@feathersjs/socketio-client';

// REST bindings for Feathers
// import rest from '@feathersjs/rest-client';

// Watchers/Listeners for feathers services
import rx from 'feathers-reactive';

// Create our context
const Context = createContext();

export const FeathersConsumer = Context.Consumer;

export class FeathersProvider extends Component {

    state = { client: null };

    // Store the socket so we can disconnect later.
    socket = null;

    componentWillMount() {
        if (isSSR) return;
        /* Setup Feathers, connecting with WebSocket/REST protocols.
            Feathers provides easy server-to-browser communication. */
        this.socket = io();

        // Init feathers client on the browser.
        const client = feathers();

        // Configure feathers options
        let options = {
            header: 'Authorization',
            path: '/authentication',
            jwtStategy: 'jwt',
            entity: 'user',
            service: 'users',
            cookie: 'feathers-jwt',
            storageKey: 'feathers-jwt',
            storage: window.localStorage
        };

        // client.configure(rest(API_URL)) // Connect Feathers thru a REST api.
        client.configure(socketio(this.socket)); // Connect Feathers thru Socket.io
        client.configure(authentication(options)); // Authentication

        /* Adds Event Listeners!
            Ex .server('users').watch().find().subscribe(users => console.log(users)))
        */
        client.configure(rx({
            idField: '_id' // FeathersJS knows when to use SQL or NoSQL by using: "id" vs "_id".
        }));

        this.setState({ client });
    }

    // Disonnect the socket on unmount.
    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <Context.Provider value={{ feathers: this.state.client }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}