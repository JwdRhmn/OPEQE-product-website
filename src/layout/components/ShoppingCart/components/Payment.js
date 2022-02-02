import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import CustomListItem from "../../CustomListItem";
import CreditCard from "../../CreditCard";


import {
    PROFILE_PAYMENT_LIST_PAGE_URL,
} from "../../../config/routing";


export default function(props) {
	const { 
        className, 
        style,
        card,
        ...others
    } = props;

    return (
        <div 
        	className={cn(
        		'payment-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >                
            {card ? (
                <CreditCard
                    icon={card.type}
                    expDate={card.expDate}
                    number={card.number}
                    zipCode={card.zipCode}
                    state={card.state}
                    component="div"
                />
            ) : (
                <CustomListItem
                    className="payment green"
                    noIcon
                    component={Link}
                    to={`/${PROFILE_PAYMENT_LIST_PAGE_URL()}`}
                >
                    Payment Method
                </CustomListItem>
            )}
        </div>
    );
}
