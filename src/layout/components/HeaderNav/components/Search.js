import  React from 'react';

import cn from "classnames";

import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";

export default function(props){
	const {		
		className,
		style,
		fixed,
	} = props;


	return (
		<div 
			className={cn(
				"search-l2",
				{"fixed": fixed},
				className,
			)}
			style={{
				...style
			}}
		>
			<IconButton className="button">
				<Search />
			</IconButton>
			<TextField              
                className="input"  
                type='searh'
                placeholder='Search for anything ...'
            />
		</div>
	);
}