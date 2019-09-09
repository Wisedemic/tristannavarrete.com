import React, { forwardRef } from 'react'

const inheritRefs = Component =>
  forwardRef((props, innerRef) => <Component innerRef={innerRef} ref={innerRef} {...props} />)

export default inheritRefs
