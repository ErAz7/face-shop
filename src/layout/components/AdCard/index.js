import React from "react";
import styled from "styled-components";

// define the base and logic for the component,
// this component will receive ad data and display
// it in a card
export const AdCard = props => {
	const { src, alt, ...others } = props;
	return (
		<div {...others}>
			<img src={src} alt={alt} />
		</div>
	);
};

// style and export component, thanks to 'styled-components'
export default styled(AdCard)`
	display: flex;
	width: 100%;
	min-height: 50px;
	background-color: red;
	justify-content: center;
	> img {
	}
`;
