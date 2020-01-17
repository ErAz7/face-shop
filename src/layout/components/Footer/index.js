import React from "react";
import styled from "styled-components";

// this component will loading indicator and
// display 'end of catalogue' when catalogue
// finished
export const Footer = props => {
	const { loading, ...others } = props;
	return <div {...others}>{loading ? "Loading..." : "End of catalogue"}</div>;
};

export default styled(Footer)``;
