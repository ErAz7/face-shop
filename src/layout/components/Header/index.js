import React from "react";
import styled from "styled-components";

// this component will render hedaer and sort
// method select
export const Header = props => {
	const { ...others } = props;
	return <div {...others}>I'm Header :)</div>;
};

export default styled(Header)``;
