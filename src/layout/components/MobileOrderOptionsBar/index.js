import React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import getOrderOptions from "../../functions/getOrderOptions";

import getUserDefaultAddress from "../../../store/selectors/user/getUserDefaultAddress";
import getUserDeliveryCondition from "../../../store/selectors/user/getUserDeliveryCondition";

import { storeStreetAddress } from "../../config/store";

import { ORDER_OPTIONS_PAGE_URL } from "../../config/routing";

function Index(props) {
	const { 
        deliveryCondition: {
            type: { full: fullType, code: typeCode },
            schedule
        },
        defaultAddress,
        className, 
        style,
        ...others
    } = props;

    const isDelivery = typeCode === 'delivery';

    const subText = getOrderOptions({
        schedule,
        typeCode,
        defaultAddress,
        storeStreetAddress
    })

    return (
        <Link 
        	className={cn(
        		'mobile-order-options-bar-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            to={`/${ORDER_OPTIONS_PAGE_URL()}`}
            {...others}
        >
            <span className="main">
                {fullType}
            </span>
            <br/>
            <span className="sub">
                {subText}
            </span>
        </Link>
    );
}


export default connect(
    state => {
        return {
            deliveryCondition: getUserDeliveryCondition(state),
            defaultAddress: getUserDefaultAddress(state)
        };
    },
    {}
)(Index);