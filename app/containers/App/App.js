/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'containers/Header/';
import Footer from 'containers/Footer/';

import HomePage from 'containers/HomePage/Loadable';
import Four_Oh_Four from 'containers/NotFoundPage/Loadable';
import GlobalMessages from 'containers/GlobalMessages/'

import './style.scss';

const App = () => (
  <React.Fragment>
    <Header />
    <GlobalMessages />
    <div id="app-content">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={Four_Oh_Four} />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default App;
