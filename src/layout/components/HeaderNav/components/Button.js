import  React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Button from "../../DefaultButton";

export default function(props){
	const {
		className,
		style,
		fixed,
		children,
		...others
	} = props;

	return (
		<Button 
			className="button"
			containerProps={{
				className: cn(
					"button-l2",
					{"fixed": fixed},
					className,
				)
			}}
			component={Link}
			style={{
				...style
			}}
			round
			size="small"
			{...others}
		>
			{children}
		</Button>
	);
}