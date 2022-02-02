import  React from 'react';
import { NavLink } from "react-router-dom";
import cn from "classnames";


export default function(props){
	const {
		children,
		className,
		activeClassName,
		fixed,
		style,
		href,
		...others
	} = props;

	return (
		<NavLink 
			className={cn(
				"link-l2",
				{"fixed": fixed},
				className,
			)}
			activeClassName={cn(
				'active',
				activeClassName,
			)}
			style={{
				...style
			}}
			to={href}
			{...others}
		>
			{children}
		</NavLink>
	);
}