import React, { memo } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Face from "./components/Face";
import Footer from "./components/Footer";
import centToDollar from "../../functions/centToDollar";
import relativeDate from "../../functions/relativeDate";

// renders product card responsively,
// uses react memo to avoid unnecessary
// re-renders

const widths = { xs: 98, sm: 45, md: 24 };

const ProductCard = props => {
	const { skeleton, children, size, face, date, price, ...others } = props;
	return (
		<div {...others}>
			<RatioContainer disabled={skeleton}>
				<ContentContainer skeleton={skeleton}>
					<Face
						date={relativeDate(date)}
						skeleton={skeleton}
						size={size}
						face={face}
					/>
					<Footer skeleton={skeleton} price={centToDollar(price)} />
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
	transition: box-shadow 0.4s;
	background-color: ${({ theme, skeleton }) =>
		skeleton ? theme.palette.grey[500] : theme.palette.dark.main};
	color: ${({ theme }) => theme.palette.secondary.main};
	&:hover {
		box-shadow: 0px 0px 12px 2px ${({ theme }) => theme.palette.dark.main};
	}
`;

const RatioContainer = styled(Button)`
	position: relative;
	padding-top: 100%;
	width: 100%;
`;

const StyledProductCard = styled(ProductCard)`
	margin: 3% 0;
	width: ${widths.xs}%;
	${({ theme }) => theme.breakpoints.up("sm")} {
		width: ${widths.sm}%;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		width: ${widths.md}%;
	}
`;

export default memo(StyledProductCard, (prev, next) => {
	return (
		prev.skeleton === next.skeleton &&
		prev.children === next.children &&
		prev.size === next.size &&
		prev.face === next.face &&
		prev.date === next.date &&
		prev.price === next.price
	);
});
