import React from 'react';
import Styled from 'styled-components';

const StyledFooter = Styled(props => (
  <footer {...props} />
))`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Footer = () => (
  <StyledFooter className="hero is-light is-bold">
    <div className="hero-body" style={{padding: '1.5rem'}}>
      <div className="container has-text-centered">
        <div className="columns">
          <div className="column">
            <p className="content">Made by Tristan Navarrete &copy; 2018</p>
          </div>
        </div>
      </div>
    </div>
  </StyledFooter>
);

export default Footer;
