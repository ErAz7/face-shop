import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import LogoText from "./components/LogoText";
import SortBy from "./components/SortBy";
import SortOptions from "./components/SortOptions";

// renders app header responsively

const Header = props => {
	const { sortBy, onSortChange, sortDisabled, ...others } = props;

	const breakpoints = {
		xs: 11,
		md: 10
	};

	const theme = useTheme();
	const breakpointMatch = {
		sm: useMediaQuery(theme.breakpoints.up("sm"))
	};

	const [showSortBy, setShowSortBy] = useState(false);

	const handleShowSortChange = () => {
		setShowSortBy(!showSortBy);
	};

	return (
		<header {...others}>
			<Container container item {...breakpoints}>
				{(!showSortBy || breakpointMatch.sm) && (
					<LogoTextContainer>
						<LogoText text="Face Shop" />
					</LogoTextContainer>
				)}
				<SortByContainer>
					<SortBy
						disabled={sortDisabled}
						value={sortBy}
						onChange={onSortChange}
						show={showSortBy}
						shrink={!breakpointMatch.sm}
					/>
				</SortByContainer>
				<SortOptions hide={showSortBy} onClick={handleShowSortChange} />
			</Container>
		</header>
	);
};

const LogoTextContainer = styled.div``;

const SortByContainer = styled.div`
	width: 100%;
`;

const Container = styled(Grid)`
	display: inline-flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

export default styled(Header)`
	text-align: center;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	box-shadow: 0 0px 4px -2px ${({ theme }) => theme.palette.light.main};
	background-color: ${({ theme }) => theme.palette.dark.main};
	z-index: ${({ theme }) => theme.zIndex.max};
	height: ${({ theme }) => theme.header.height.small}px;
	${({ theme }) => theme.breakpoints.up("sm")} {
		height: ${({ theme }) => theme.header.height.medium}px;
	}
`;
