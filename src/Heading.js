import React from 'react';

const Heading = ({ children, ...rest }) => (
  <h1 {...rest}>{children}</h1>
);

export default Heading;
