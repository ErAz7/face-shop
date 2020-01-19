import React from "react";
import styled from "styled-components";
import Logo from "../../Logo";

// this renders the logo and text beside it
// responsively

const LogoText = props => {
	const { text, ...others } = props;
	return (
		<div {...others}>
			<Logo color="primary" />
			<Text>{text}</Text>
		</div>
	);
};

const Text = styled.span`
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.palette.primary.main};
	${({ theme }) => theme.breakpoints.up("sm")} {
		font-size: 18px;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		font-size: 22px;
	}
`;

export default styled(LogoText)`
	white-space: nowrap;
	${Logo} {
		margin-right: 5px;
		font-size: 40px;
		${({ theme }) => theme.breakpoints.up("sm")} {
			font-size: 60px;
		}
		${({ theme }) => theme.breakpoints.up("md")} {
			margin-right: 20px;
		}
	}
`;
