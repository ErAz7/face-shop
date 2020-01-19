import React, { useState } from "react";
import styled from "styled-components";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import Skeleton from "@material-ui/lab/Skeleton";

// renders face, size, and date
// has an option to zoom out the face
// if it was larger than the card size.
// zoom ratio is calculated based on
// size and face cahracter count

const Face = props => {
	const { date, skeleton, face, size, ...others } = props;

	const [zoom, setZoom] = useState(false);

	const handleZoom = () => setZoom(!zoom);

	if (skeleton) {
		return (
			<div {...others}>
				<Text>
					<SkeletonText variant="text" />
				</Text>
				<Top>
					<SkeletonSize variant="rect" />
					<Date>
						<SkeletonDate variant="text" />
					</Date>
				</Top>
			</div>
		);
	}

	return (
		<div onClick={handleZoom} {...others}>
			<Top>
				<Size>
					<FormatSizeIcon />
					{size}
				</Size>
				<Date>{date}</Date>
			</Top>
			<Text
				zoom={zoom}
				ratio={(20 * 1) / (face.length + size)}
				size={size}
			>
				{face}
			</Text>
			<ZoomText zoom={zoom}>
				{zoom ? "Tap for original" : "Tap to zoom out"}
			</ZoomText>
		</div>
	);
};

const ZoomText = styled.div`
	position: absolute;
	bottom: 2px;
	left: 0;
	font-size: 14px;
	width: 100%;
	text-align: center;
	color: ${({ theme, zoom }) =>
		zoom ? theme.palette.secondary.main : theme.palette.semiLight.main};
	text-transform: none;
`;

const SkeletonText = styled(Skeleton)`
	width: 120px;
	height: 40px;
`;
const SkeletonSize = styled(Skeleton)`
	padding: 25px;
	height: 0;
	border-radius: 0 0 5px 0;
`;
const SkeletonDate = styled(Skeleton)`
	width: 100px;
	height: 20px;
	display: inline-block;
`;

const Top = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;

const Text = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	white-space: nowrap;
	transition: transform 0.5s;
	font-size: ${({ size }) => size}px;
	transform: scale(${({ zoom, ratio }) => (zoom ? ratio : "1")});
`;

const Size = styled.div`
	background-color: ${({ theme }) => theme.palette.primary.main};
	color: ${({ theme }) => theme.palette.ultraLight.main};
	padding: 10px;
	border-radius: 0 0 5px 0;
	white-space: nowrap;
`;

const Date = styled.div`
	color: ${({ theme }) => theme.palette.light.main};
	padding: 10px;
	border-radius: 0 0 5px 0;
	width: 100%;
	text-transform: none;
`;

export default styled(Face)`
	width: 100%;
	height: 100%;
	position: relative;
`;
