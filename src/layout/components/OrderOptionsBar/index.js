import React, { useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { ORDER_OPTIONS_PAGE_URL } from "../../config/routing";

import Grid from "@material-ui/core/Grid";
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Button from "../DefaultButton";

import TypeSelect from "./components/TypeSelect";

import setDeliveryCondition from "../../../store/actions/user/setDeliveryCondition";
import getUserDefaultAddress from "../../../store/selectors/user/getUserDefaultAddress";
import getUserDeliveryCondition from "../../../store/selectors/user/getUserDeliveryCondition";
import getUserAuth from "../../../store/selectors/user/getUserAuth";

import { storeStreetAddress } from "../../config/store";
import { ITEM_SEARCH_PAGE_URL } from "../../config/routing";

import getOrderOptions from "../../functions/getOrderOptions";

export function Index(props) {
	const {
		className,
		style,
		defaultAddress,
		itemBreakpoints,
		deliveryCondition: {
			type: { full: fullType, code: typeCode },
			schedule
		},
		setDeliveryCondition,
		token,
		...others
	} = props;


	function handleTypeChange(type){
		setDeliveryCondition({
	        type: type
	    });
	}

	const isDelivery = typeCode === "delivery";

	return (
		<Grid
			className={cn(
				"order-options-bar-l1", 
				className
			)}
			style={{
				...style
			}}
			container
			justify="center"
			{...others}
		>
			<Grid
				className="container"
				container
				item
				justify="flex-start"
				alignItems="center"
				{...itemBreakpoints}
			>
				<RouterLink 
					className="options"
					to={`/${ORDER_OPTIONS_PAGE_URL()}`}
				>
					<div className="mode">{fullType}</div>
					{(defaultAddress || !isDelivery) ? (
						<div className="sub">
							{getOrderOptions({
								schedule,
								typeCode,
								defaultAddress,
								storeStreetAddress
							})}
						</div>
					) : (
						<div className="no-address">
							NO ADDRESS
						</div>
					)}
				</RouterLink>
				<Button
					className="change"
					size="small"
					component={RouterLink}
					to={`/${ORDER_OPTIONS_PAGE_URL()}`}
				>
					Change
				</Button>
				<TypeSelect 
					onChange={handleTypeChange}
					value={typeCode}
				/>
				{defaultAddress && (
					<RouterLink 
						className="address-container"
						to={`/${ORDER_OPTIONS_PAGE_URL()}`}
					>
						<div className="divider" />
						<LocationOnIcon />
						<div className="address">
							<div className="line1">
		                        {defaultAddress.number} {defaultAddress.street}
		                    </div>
		                    <div className="line2">
		                        {defaultAddress.city && defaultAddress.city + ','} {defaultAddress.stateCode} {defaultAddress.zipCode}        
		                    </div>
						</div>
					</RouterLink>
				)}
				<div className="divider" />
				<RouterLink 
					className="catering"
					to={`/${ITEM_SEARCH_PAGE_URL({filterTypes: ['catering']})}`}
				>
					Catering
				</RouterLink>
			</Grid>
		</Grid>
	);
}

export default connect(
	state => {
		return {
			defaultAddress: getUserDefaultAddress(state),
			deliveryCondition: getUserDeliveryCondition(state),
			token: getUserAuth(state)
		};
	},
	{
		setDeliveryCondition
	}
)(Index);
