import React from 'react';
import Styled from 'styled-components';

const Banner = Styled.div`
  width: 100%;
  height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
	background-position: center bottom;
	position: absolute;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-image: url('${props => props.src}');
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
`;

const StyledBanner = ({ className, ...rest}) => {
  return (
    <Banner
      {...rest}
      className={`banner ${className}`}
    />
  );
};

export default StyledBanner;
