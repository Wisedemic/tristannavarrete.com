import 'aframe';
import 'aframe-mountain-component';

import {
	disconnect,
	subscribeToConnect,
	subscribeToUserList,
	subscribeToUserConnected,
	subscribeToUserDisconnected
} from './events';

import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';


class Animation extends Component {
	constructor() {
		super();
		this.state = {
			users: [], // list of users in lobby
			connected: false // Websocket connection
		};

		// Detect Enter key when the user enters a name
		this.onChangeName = e => {
			if (e.key == 'Enter') {
				/* The user hit enter,
				so now we attempt to connect and listen for success. */
				subscribeToConnect(() => {
					console.log('CONNECT EVENT');
					this.setState({connected: true});
				});
			}
		}
	}

	// OnMount, Start listening for socket events.
	componentDidMount() {
		// When a list is recieved
		subscribeToUserList(userList => {
			this.setState({users: userList});
		});

		// When a user connects
		subscribeToUserConnected(user => {
			this.setState({
				users: this.state.users.concat(user)
			});
		});

		// When a user disconnects
		subscribeToUserDisconnected(id => {
			this.setState({
				users: this.state.users.filter(user => user.id == id)
			});
		});
	}
	// Disconnet the socket before Unmount.
	componentWillUnmount() {
		disconnect();
	}

	render() {
    return (
      <section className="hero is-white is-fullheight">
				{this.state.connected ? (
					<Scene transparent>
						<a-assets>
							<img id="sky" src={require('images/sky.png')} />
						</a-assets>
						{this.state.users.map((user) => (
							<Entity
								key={user.id}
								geometry={{primitive: 'box'}}
								material={{color: 'green'}}
								position={user.position} />
						))}
							<a-sky rotation="0 -180 0" src='#sky'>
								<a-animation attribute="rotation" fill="forwards" easing="linear" dur="240000" from="0 0 0" to="0 360 0" repeat="indefinite"></a-animation>
							</a-sky>
							<Entity light={{type: 'hemisphere'}} color="#33C" groundColor="#3C3" intensity="2" position="-1 -1 0"/>
							<Entity mountain/>
						</Scene>
				) : (
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column">
                  <h1 className="title">Enter your name to continue</h1>
									<div className="field">
										<div className="control">
											<input
												onKeyPress={this.onChangeName}
												className="input is-large is-primary"/>
										</div>
									</div>
                </div>
              </div>
            </div>
					</div>
				)}
      </section>
	  );
  }
}

export default Animation;
