import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const GridList = React.forwardRef((props, ref) => {
	const { children, ...others } = props;
	const breakpoints = {
		xs: 11,
		sm: 10
	};
	return (
		<div ref={ref} {...others}>
			<Container container item {...breakpoints}>
				{children}
			</Container>
		</div>
	);
});

const Container = styled(Grid)`
	display: inline-flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export default styled(GridList)`
	text-align: center;
`;
