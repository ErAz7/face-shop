import React from "react";
import styled from "styled-components";
import Logo from "../../Logo";

const LogoName = props => {
	const { ...others } = props;
	return (
		<div {...others}>
			<Logo color="primary" />
			<Text>Face Catalogue</Text>
		</div>
	);
};

const Text = styled.span`
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.palette.primary.main};
	${({ theme }) => theme.breakpoints.up("sm")} {
		font-size: 20px;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		font-size: 22px;
	}
`;

export default styled(LogoName)`
	white-space: nowrap;
	${Logo} {
		margin-right: 20px;
		font-size: 40px;
		${({ theme }) => theme.breakpoints.up("sm")} {
			font-size: 60px;
		}
	}
`;
