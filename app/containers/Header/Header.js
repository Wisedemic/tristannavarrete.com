import React, { Component } from 'react';
import Styled from 'styled-components';

const StyledHeader = Styled(props => (
  <nav {...props} />
))`
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuToggled: false
    };

    this.onClickMenu = () => this.setState(prevState => ({menuToggled: !prevState.menuToggled}));
  }

  render() {
    return (
      <StyledHeader className="navbar is-fixed-top">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <div className="navbar-item">
              <div id="logo" style={{lineHeight: '1rem'}}>
                <div className="title is-6" style={{marginBottom: '0'}}>
                  Tristan navarrete
                  <br />
                  <p className="subtitle is-6">
                    Web Developer & Blockchain Developer
                  </p>
                </div>
              </div>
            </div>
            <div onClick={this.onClickMenu} className={`navbar-burger ${this.state.menuToggled ? ' is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`navbar-menu  ${this.state.menuToggled ? ' is-active' : ''}`}>
            <div className="navbar-start"></div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a target="_blank" href="https://medium.com/@navarrete.tristan" className="button is-success">
                    <span>Medium</span>
                    <span className="icon"><i className="fab fa-medium-m"></i></span>
                  </a>
                  <a target="_blank" href="https://twitter.com/TristanPreaches" className="button is-info">
                    <span>Twitter</span>
                    <span className="icon"><i className="fab fa-twitter"></i></span>
                  </a>
                  <a target="_blank" href="https://github.com/Wisedemic" className="button is-dark">
                    <span>Github</span>
                    <span className="icon"><i className="fab fa-github"></i></span>
                  </a>
                  <a href="mailto:navarrete.tristan@gmail.com" className="button is-light">
                    <span>Email</span>
                    <span className="icon"><i className="far fa-envelope"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledHeader>
    );
  }
}


export default Header;
