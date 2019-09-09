import Head from 'next/head'
import Styled from 'styled-components'
import React, { Component } from 'react'
import { Entity, Scene } from 'aframe-react'
import { Typography } from 'antd'
const { Text } = Typography

const SceneWrapper = Styled.div`
	min-height: 40px;
	background-color: white;
`

const StyledPanel = Styled.nav`
  background-color: white;
	.a-enter-vr.embedded {
		position: relative  !important;
		right: unset;
		bottom: unset;
		.a-enter-vr-button {
			position: relative !important;
			margin: 1rem;
		}
	}
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
`

class VRWorld extends Component {
  render() {
    return (
      <StyledPanel id="VRWorld" className="panel">
        <Head>
          <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
          <script src="https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"></script>
        </Head>
        <div className="panel-block" style={{ flexDirection: 'column', borderTop: 'none' }}>
          <Text>
            A small VR world with some randomly generated mountains. Nothing fancy here. Just testing out some VR stuff
          </Text>
        </div>
        <SceneWrapper className="panel-block">
          <Scene embedded>
            {/* <a-assets>
              <img id="sky" src={'static/sky.png'} />
            </a-assets>
            <a-sky rotation="0 -180 0" src="#sky">
              <a-animation
                attribute="rotation"
                fill="forwards"
                easing="linear"
                dur="240000"
                from="0 0 0"
                to="0 360 0"
                repeat="indefinite"
              ></a-animation>
            </a-sky> */}
            <a-entity environment="lightPosition: 1 5 -2; groundColor: #445"></a-entity>
          </Scene>
        </SceneWrapper>
      </StyledPanel>
    )
  }
}

export default VRWorld
