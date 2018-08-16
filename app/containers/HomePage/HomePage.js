/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FancyText from 'components/FancyText/';
import Banner from 'components/Banner/';

export default class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero is-dark is-bold is-fullheight">
          <Banner src={require('images/glasses.jpg')} />
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column">
                  <h1 className="title is-1">A Personal Collection of Ideas & Projects
                  {/*
                    <FancyText text={'Ideas'}/> 
                      */}
                    </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-light is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column">
                  <h2 className="title is-2">Under Construction</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
	  );
  }
}

// HomePage.propTypes = {
// };
