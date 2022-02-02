import  React, { useState, useEffect } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import isMobile from "../../../functions/isMobile";

import getCartSummary from "../../../store/selectors/cart/getCartSummary";
import getUserAuth from "../../../store/selectors/user/getUserAuth";

import HeaderNav from "../HeaderNav";
import BottomNav from "../BottomNav";
import MobileTop from "../MobileTop";
import ContinueOrderNotification from "../ContinueOrderNotification";

function Index(props){
	const {
		className,
		style,
		headerProps,
		breakpoints,
		cart: {
			items,
			totals,
		},
		auth,
		logOut,
		...others
	} = props;
	
	const [ showNotification, setShowNotification ] = useState(false);

	useEffect(() => {
		if(items.length){
			setTimeout(
				() => setShowNotification(true)
			, 600);
		}
	}, [])




	return (
		<>
			<ContinueOrderNotification 
				open={showNotification}
				onClose={() => setShowNotification(false)}
				img={items.length && items[0].image}
			/>
			<div 
				className={cn(
					"main-nav-l1",
					className,
				)} 
				style={{
					...style,
				}}
				{...others}
			>
				{isMobile ? (
					<>
						<MobileTop />
						<BottomNav cartBadge={totals.quantity} />
					</>
				) : (
					<HeaderNav 
						breakpoints={breakpoints}  
						cartBadge={totals.quantity}
						showcart={auth}
						{...headerProps}
					/>
				)}
			</div>
		</>
	);
}




export default connect(state => {
    return {
        cart: getCartSummary(state),
        auth: getUserAuth(state),
    }

},
	{}
)(Index);