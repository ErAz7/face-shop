import React from "react";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";

const SortBy = props => {
	const { shrink, show, value, disabled, onChange, ...others } = props;

	const handleChange = newValue => () =>
		!disabled && onChange && onChange(newValue);

	return (
		<div {...others}>
			<HeaderButton
				disabled={disabled}
				onClick={handleChange("price")}
				selected={value === "price"}
			>
				{shrink ? "By Price" : "Cheapest First"}
			</HeaderButton>
			<HeaderButton
				disabled={disabled}
				onClick={handleChange("size")}
				selected={value === "size"}
			>
				{shrink ? "By Size" : "Smallest First"}
			</HeaderButton>
			<HeaderButton
				disabled={disabled}
				onClick={handleChange("id")}
				selected={value === "id"}
			>
				By ID
			</HeaderButton>
		</div>
	);
};

export default styled(SortBy)`
	display: ${({ show }) => (show ? "block" : "none")};
	text-align: left;
	${({ theme }) => theme.breakpoints.up("sm")} {
		display: block;
		text-align: right;
	}
`;
