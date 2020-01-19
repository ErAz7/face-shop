import React from "react";
import styled from "styled-components";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const Logo = props => {
	const { ...others } = props;
	return <InsertEmoticonIcon {...others} />;
};

export default styled(Logo)`
	vertical-align: middle;
	color: ${({ color, theme }) => color && theme.palette[color].main};
	font-size: ${({ size }) => (size ? size : 60)}px;
`;
