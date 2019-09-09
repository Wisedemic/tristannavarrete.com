import React from 'react';
import styled from 'styled-components';

const Toast = styled.div`
	font-weight: 500;
	z-index: 100;
	display: inline-flex;
	position: fixed;
	top: 2%;
	right: 5%;
	justify-content: center;
	align-items: center;
	padding: 0.5rem 0.5rem 0.5rem 1rem;
    box-shadow: 1px 1px 1px 1px whitesmoke;
	border-radius: 30px;
	background-color: white;
	> img {
		height: 40px;
 	}
`;

export default Toast;
