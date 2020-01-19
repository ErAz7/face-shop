import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Skeleton from "@material-ui/lab/Skeleton";

// renders price and a fake buy button

const Footer = props => {
	const { skeleton, price, ...others } = props;

	if (skeleton) {
		return <Skeleton variant="rect" {...others}></Skeleton>;
	}

	return (
		<div {...others}>
			<Price>
				<Dollar>$</Dollar>
				{price}
			</Price>
			<Buy>
				<Cart />
				Buy
			</Buy>
		</div>
	);
};

const Dollar = styled.span`
	font-size: 25px;
	font-weight: bold;
	margin-right: 8px;
	vertical-align: top;
`;

const Price = styled.div`
	font-size: 20px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	white-space: nowrap;
	height: 100%;
	padding: 0 15px;
	background-color: ${({ theme }) => theme.palette.semiLight.main};
	color: ${({ theme }) => theme.palette.light.main};
`;

const Buy = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.palette.ultraLight.main};
	background-color: ${({ theme }) => theme.palette.primary.main};
	font-size: 24px;
`;

const Cart = styled(ShoppingCartIcon)`
	font-size: inherit;
	margin-right: 10px;
`;

export default styled(Footer)`
	height: 50px;
	display: flex;
	flex-wrap: nowrap;
`;
