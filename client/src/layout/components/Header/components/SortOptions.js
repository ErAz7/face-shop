import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import CloseIcon from "@material-ui/icons/Close";

// renders icon buttons for small
// devices to show/hide sort options

const SortOptions = props => {
	const { hide, ...others } = props;

	return (
		<IconButton {...others}>
			{hide ? <CloseIcon /> : <SortIcon />}
		</IconButton>
	);
};

export default styled(SortOptions)`
	color: ${({ theme }) => theme.palette.primary.main};
	${({ theme }) => theme.breakpoints.up("sm")} {
		display: none;
	}
`;
