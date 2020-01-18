import React from "react";
import styled from "styled-components";
import GridList from "../GridList";

const AdCard = props => {
	const { src, alt, ...others } = props;
	return (
		<div {...others}>
			<img src={src} alt={alt} />
		</div>
	);
};

export default styled(AdCard)`
	display: flex;
	width: 100%;
	min-height: 50px;
	background-color: red;
	justify-content: center;
	> img {
	}
	${GridList} & {
	}
`;
