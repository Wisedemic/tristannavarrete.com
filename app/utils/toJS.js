import React from 'react';
import { Iterable } from 'immutable';
/*
	This is more of a Monkey-patch solution.
	It's possible to leave objects as immutable objects all the way until render.
	But, this component can help remove some stress
	when trying to create an component when using React-Redux-Immutables
*/
export const toJS = WrappedComponent => wrappedComponentProps => {
  const [KEY, VALUE] = [0, 1];
  const propsJS = Object.entries(
    wrappedComponentProps
  ).reduce((newProps, wrappedComponentProp) => {

    // Reduce Immutables to JS
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
      wrappedComponentProp[VALUE]
    ) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE]
    return newProps;
  }, {});
	
  return (<WrappedComponent {...propsJS} />);
}

export default toJS;
