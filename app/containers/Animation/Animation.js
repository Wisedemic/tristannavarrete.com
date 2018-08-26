import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-mountain-component';

import {
	subscribeToConnect,
	subscribeToUserList,
	subscribeToDisconnect
} from './events';

import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';


class Animation extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			connected: false
		};
		this.onChangeName = e => {
			if (e.key == 'Enter') {
				subscribeToConnect(() => this.setState({connected: true}));
			}
		}
	}

	componentDidMount() {
		subscribeToUserList(userList => this.setState({users: userList}));
		subscribeToDisconnect(id =>
			this.setState({
				users: this.state.users.filter(user => user.id == id)
			})
		);
	}
	//
	// componentWillUnmount() {
	// 	clearInterval(this.interval);
	// }

	render() {
		// <Entity particle-system={{
		// 		randomize: true,
		// 		rotationAngle: 0,
		// 		preset: 'dust',
		// 		particleCount: 3000,
		// 		accelerationSpread: '0 0 1',
		// 		accelerationValue: '0, 0, 1'
		// 	}} />
		console.log(this.state)
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
