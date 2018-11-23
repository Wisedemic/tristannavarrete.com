import isSSR from '../../utils/isSSR';
import Styled from 'styled-components';

import 'aframe';
import 'aframe-mountain-component';

import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';

const SceneWrapper = Styled.div`
	min-height: 40px;
	background-color: white;
`;

const StyledPanel = Styled.nav`
	.a-enter-vr.embedded {
		position: relative  !important;
		right: unset;
		bottom: unset;
		.a-enter-vr-button {
			position: relative !important;
			margin: 1rem;
		}
	}
	
	background-color: white;

    .panel-heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        #timeElapsed {
            marginLeft: 0.7rem;
            fontSize: 16px;
        }
    }
    .panel-tabs {
        color: #3273dc;
    }
`;

class VRWorld extends Component {
	render() {
		return (
			<StyledPanel className="panel" id="VRWorld">
				<div className="panel-heading">
					<span>VRWorld</span>
					<span>*You can move using WASD</span>
				</div>
				<SceneWrapper className="panel-block">
					<Scene embedded>
						<a-assets>
							<img id="sky" src={'static/sky.png'} />
						</a-assets>
						<a-sky rotation="0 -180 0" src='#sky'>
							<a-animation attribute="rotation" fill="forwards" easing="linear" dur="240000" from="0 0 0" to="0 360 0" repeat="indefinite"></a-animation>
						</a-sky>
						<Entity light={{ type: 'hemisphere' }} color="#33C" groundColor="#3C3" intensity="2" position="-1 -1 0" />
						<Entity mountain />
					</Scene>
				</SceneWrapper>
			</StyledPanel>
		);
	}
}

export default VRWorld;
