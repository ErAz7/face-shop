import React from "react";
import styled from "styled-components";

const Header = props => {
	const { sortBy, onSortChange, ...others } = props;
	return (
		<div {...others}>
			I'm Header :)
			<select value={sortBy} onChange={onSortChange}>
				<option value="price">price</option>
				<option value="size">size</option>
				<option value="id">id</option>
			</select>
		</div>
	);
};

export default styled(Header)``;
