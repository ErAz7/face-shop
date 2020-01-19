import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// this is the Ad card, it renders
// a lid that opens when image loaded
// with animation

const lidWidth = 70;

const AdCard = props => {
	const { src, alt, ...others } = props;

	const [loaded, setLoaded] = useState(false);
	const [expand, setExpand] = useState(false);

	const mainRef = useRef();

	const theme = useTheme();
	const breakpointMatch = {
		xs: useMediaQuery(theme.breakpoints.down("xs"))
	};

	useEffect(() => {
		if (expand) {
			return;
		}
		const mainContainer = mainRef.current;
		if (!mainContainer) {
			return;
		}
		const timer = setInterval(() => {
			const top = mainContainer.offsetTop;
			const height = mainContainer.offsetHeight;
			if (
				window.pageYOffset + window.innerHeight - top >
					parseInt((2 * height) / 3) &&
				loaded
			) {
				setExpand(true);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [mainRef, loaded, expand]);

	const handleImageLoad = () => setLoaded(true);

	return (
		<div ref={mainRef} {...others}>
			<Container fullWidth={breakpointMatch.xs} expand={expand}>
				<LidHalf grow="left">
					<div />
				</LidHalf>
				<Image onLoad={handleImageLoad} src={src} />
				<LidHalf grow="right">
					<div />
				</LidHalf>
			</Container>
		</div>
	);
};

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

const LidHalf = styled.div`
	position: absolute;
	height: 100%;
	overflow: hidden;
	width: ${lidWidth}px;
	background-color: ${({ theme }) => theme.palette.dark.main};
	top: 0;
	${({ grow }) =>
		grow === "left" ? "border-right:" : "border-left:"}  0.5px solid ${({
	theme
}) => theme.palette.semiDark.main};
	${({ grow }) => (grow === "left" ? "left: 0" : "right: 0")};
	border-radius: ${({ grow }) =>
		grow === "left" ? "50% 0 0 50%" : "0 50% 50% 0"};
	> * {
		position: absolute;
		top: 50%;
		width: 70px;
		height: 70px;
		transform: translate(
				${({ grow }) => (grow === "left" ? "50%" : "-50%")},
				-50%
			)
			rotate(45deg);
		background-color: ${({ theme }) => theme.palette.primary.main};
	}
`;

const Container = styled.div`
	display: inline-block;
	height: 100%;
	position: relative;
	padding: 0 ${lidWidth}px;
	box-sizing: border-box;
	transition: width 1s;
	width: ${({ expand, fullWidth }) =>
		expand ? (fullWidth ? "100%" : "410px") : "0.2px"};
`;

export default styled(AdCard)`
	width: 100%;
	height: 150px;
	text-align: center;
	margin: 20px 0;
`;
