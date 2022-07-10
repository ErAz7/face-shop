import React from "react";
import styled from "styled-components";
import LogoImg from "../../assets/logo/light.png";

// this is the app logo

const Logo = props => {
	const { ...others } = props;
	return <img src={LogoImg} alt="app logo" {...others} />;
};

export default styled(Logo)`
	vertical-align: middle;
	width: ${({ size }) => (size ? size : 50)}px;
	height: ${({ size }) => (size ? size : 50)}px;
	color: ${({ color, theme }) => color && theme.palette[color].main};
`;
