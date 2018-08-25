import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-mountain-component';

import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';

class Animation extends Component {
	// constructor() {
	// 	this.state = {
	// 		interval: undefined,
	// 		x: 0,
	// 		y: 0,
	// 		z: 0
	// 	};
	// }
	//
	// componentDidMount() {
	// 	this.interval = setInterval(() => {
	// 		this.setState(prevState => {
	// 			prevState.x
	// 		})
	// 	})
	// }
	//
	// componentWillUnmount() {
	// 	clearInterval(this.interval);
	// }

	render() {
    return (
      <section className="hero is-fullheight">
				<Scene transparent>
					<a-assets>
						<img id="sky" src={require('images/sky.png')} />
					</a-assets>
					<Entity particle-system={{
						randomize: true,
						rotationAngle: 0,
						preset: 'dust',
						particleCount: 3000,
						accelerationSpread: '0 0 1',
						accelerationValue: '0, 0, 1'
					}} />
					<Entity mountain/>
					<a-sky src='#sky' />
					<Entity light={{type: 'directional'}} position="-1 1 0"/>
				</Scene>
      </section>
	  );
  }
}

export default Animation;
