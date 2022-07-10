import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

// this renders a circular progress when
// loading more products and displays
// end of catalogue when no more products

const Footer = props => {
	const { hide, loading, ...others } = props;

	return (
		<div {...others}>
			{!hide &&
				(loading ? (
					<Progess />
				) : (
					<EndText>
						<Sad />
						~ end of catalogue ~
						<Sad />
					</EndText>
				))}
		</div>
	);
};

const Sad = styled(SentimentDissatisfiedIcon)`
	font-size: 28px;
	vertical-align: middle;
	margin: 0 5px;
`;

const Progess = styled(CircularProgress)`
	color: ${({ theme }) => theme.palette.primary.main};
`;

const EndText = styled.span`
	font-size: 22px;
`;

export default styled(Footer)`
	width: 100%;
	height: 40px;
	text-align: center;
	padding: 10px 0 40px 0;
`;
