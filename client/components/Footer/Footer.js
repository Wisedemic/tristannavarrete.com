import React from 'react';
import Styled from 'styled-components';

const StyledFooter = Styled.footer`
    z-index: -1;
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
`;

const Footer = () => (
    <StyledFooter className="hero is-white">
        <div className="hero-body" style={{ padding: '1.5rem' }}>
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
