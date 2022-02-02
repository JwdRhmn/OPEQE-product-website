import  React from 'react';
import cn from "classnames";

import FoodCard from "../../FoodCard";

export default function(props){
	const {
		isSkeleton,
		cardProps,
		className,
		style,
		...others
	} = props;

	return (
		<div 
			className={cn(
				"food-card-l2",
				className,
			)}
			style={{
				...style
			}}			
			{...others}
		>
			{isSkeleton ? (
				<FoodCard skeleton={true} />
			) : (
				<FoodCard
					{...cardProps}
				/>
			)}
		</div>
	);
}

