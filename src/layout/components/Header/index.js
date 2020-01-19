import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import LogoName from "./components/LogoName";
import SortBy from "./components/SortBy";
import SortOptions from "./components/SortOptions";

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
					<LogoNameContainer>
						<LogoName />
					</LogoNameContainer>
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

const LogoNameContainer = styled.div``;

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
	background-color: ${({ theme }) => theme.palette.dark.main};
	z-index: ${({ theme }) => theme.zIndex.max};
	height: ${({ theme }) => theme.header.height.small}px;
	${({ theme }) => theme.breakpoints.up("sm")} {
		height: ${({ theme }) => theme.header.height.medium}px;
	}
`;
