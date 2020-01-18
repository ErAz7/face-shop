import React from "react";
import styled from "styled-components";

const Footer = props => {
	const { loading, ...others } = props;
	return <div {...others}>{loading ? "Loading..." : "End of catalogue"}</div>;
};

export default styled(Footer)``;
