import React from "react";
import styled from "styled-components";
import Face from "./components/Face";
import Footer from "./components/Footer";

const widths = { xs: 98, sm: 45, md: 22 };

const ProductCard = props => {
	const { skeleton, children, size, face, date, price, ...others } = props;

	return (
		<div {...others}>
			<RatioContainer>
				<ContentContainer>
					<Face size={size} face={face} />
					<Footer price={price} date={date} />
				</ContentContainer>
			</RatioContainer>
		</div>
	);
};

const ContentContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
	transition: box-shadow 1s;
	background-color: ${({ theme }) => theme.palette.dark.main};
	color: ${({ theme }) => theme.palette.secondary.main};
	&:hover {
		box-shadow: 0px 1px 10px 3px
			${({ theme }) => theme.palette.primary.main};
	}
`;

const RatioContainer = styled.div`
	position: relative;
	padding-top: 100%;
	width: 100%;
`;

export default styled(ProductCard)`
	margin: 5px;
	width: ${widths.xs}%;
	${({ theme }) => theme.breakpoints.up("sm")} {
		width: ${widths.sm}%;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		width: ${widths.md}%;
	}
`;
