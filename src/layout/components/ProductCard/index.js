import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Face from "./components/Face";
import Footer from "./components/Footer";

const widths = { xs: 98, sm: 45, md: 22 };

const ProductCard = props => {
	const { skeleton, children, size, face, date, price, ...others } = props;

	return (
		<div {...others}>
			<RatioContainer disabled={skeleton}>
				<ContentContainer skeleton={skeleton}>
					<Face skeleton={skeleton} size={size} face={face} />
					<Footer skeleton={skeleton} price={price} date={date} />
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

export default styled(ProductCard)`
	margin: 3% 0;
	width: ${widths.xs}%;
	${({ theme }) => theme.breakpoints.up("sm")} {
		width: ${widths.sm}%;
	}
	${({ theme }) => theme.breakpoints.up("md")} {
		width: ${widths.md}%;
	}
`;
