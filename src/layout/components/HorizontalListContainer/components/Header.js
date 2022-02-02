import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Skeleton from '@material-ui/lab/Skeleton';


export default function Index(props){
	const {
		title,
		subTitle,
		linkText,
		linkTarget,
		skeleton,
	} = props;

	if(skeleton){
		return renderSkeleton();
	}

	return (
		<div className="header-l2">
			<div className="title">
				{title}
			</div>
			<Grid container justify="space-between" className="sub-title">
				<span className="text">
					{subTitle}
				</span>
				{(linkTarget && linkText) &&
					<Link className="more" to={linkTarget}>
						{linkText} <ArrowForwardIos className="icon" fontSize="inherit" />
					</Link>
				}
			</Grid>
		</div>
	);
}




function renderSkeleton(){
	const textStyle = {
		margin: '5px 0',
	}

	return (
		<div className="header-l2">
			<Skeleton 
				className="title" 
				variant="text" 
				width={'150px'}
				style={textStyle}
			/>
			<Grid container justify="space-between" className="sub-title">
				<Skeleton 
					className="text" 
					variant="text" 
					width={'220px'}
					style={textStyle}
				/>
			</Grid>
		</div>
	);
}