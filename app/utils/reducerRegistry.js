import React, { Component } from 'react';

/*
	This is a special Class-Object-Component-Thing (js lol) that listens for changes to
	all /container and /component reducer.js files.
	This allows for Hot-reloading, as well as a much more modular
	architecture for a react application.
*/
export class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

	// Getter, returns all reducers registered
  getReducers() {
    return { ...this._reducers };
  }

	// Register each {reducer} by a {name} key
  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

	// Sets a listener on the reducer to listen for changes.
  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

// Initalize it before export.
const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
