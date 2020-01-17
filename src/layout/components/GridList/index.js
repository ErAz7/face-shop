import React from "react";
import styled from "styled-components";

// define the base and logic for the component,
// this component will receive cards as 'children' and
// display them in a responsive grid view
export const GridList = React.forwardRef((props, ref) => (
	<div ref={ref} {...props} />
));

// style and export component, thanks to 'styled-components'
export default styled(GridList)``;
