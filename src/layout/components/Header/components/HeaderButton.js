import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

// this renders the buttons for use in header
// responsively

const HeaderButton = props => {
	const { disabled, value, onChange, ...others } = props;
	return <Button variant="contained" {...others} />;
};

export default styled(HeaderButton)`
	font-size: 12px;
	margin: 0 0.5%;
	text-align: right;
	cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
	&:hover {
		background-color: ${({ theme, selected }) =>
			selected
				? theme.palette.primary.main
				: theme.palette.semiLight.main};
	}
	background-color: ${({ theme, selected }) =>
		selected ? theme.palette.primary.main : theme.palette.semiLight.main};
	color: ${({ theme }) => theme.palette.light.main};
	${({ theme }) => theme.breakpoints.up("sm")} {
		font-size: 14px;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		font-size: 18px;
		margin: 0 2%;
	}
`;
