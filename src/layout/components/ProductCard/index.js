import React from "react";
import styled from "styled-components";

// define the base and logic for the component,
// this component will receive product data and display
// it in a card
export const ProductCard = props => {
	const { skeleton, ...others } = props;
	return <div {...others} />;
};

// style and export component, thanks to 'styled-components'
export default styled(ProductCard)`
	background-color: rgb(
		120,
		${({ skeleton }) => (skeleton ? "120" : "160")},
		120
	);
	color: white;
	display: inline-flex;
	width: 22%;
	height: 200px;
	margin: 5px 1.5%;
	align-items: center;
	justify-content: center;
`;
