import React from 'react'
import Styled from 'styled-components'

export default Styled.div`
    width: 100%;
    height: 100vh;
    background-attachment: fixed;
    position: absolute;
    background-size: cover;
    filter: blur(5px);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-image: ${props =>
      props.url ? `url(${props.url || props.src})` : `none`}
`
