import React from "react";
import styled from "styled-components";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import Skeleton from "@material-ui/lab/Skeleton";

const Face = props => {
	const { date, skeleton, face, size, ...others } = props;

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
		<div {...others}>
			<Text size={size}>{face}</Text>
			<Top>
				<Size>
					<FormatSizeIcon />
					{size}
				</Size>
				<Date>2 weeks ago</Date>
			</Top>
		</div>
	);
};

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
	font-size: ${({ size }) => size}px;
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
`;

export default styled(Face)`
	width: 100%;
	height: 100%;
	position: relative;
`;
