import React, { useState } from 'react';
import cn from "classnames";
import { Link } from 'react-router-dom'

import List from "@material-ui/core/List";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import LocationOnIcon from "@material-ui/icons/LocationOn";


import CustomListItem from "../../CustomListItem";

import {
    storeStreetAddress,
    storeCity,
    storeState,
    storeZipCode,
} from "../../../config/store";
import {
    ORDER_OPTIONS_PAGE_URL,
} from "../../../config/routing";


export default function(props) {
	const { 
        className, 
        style,
        delivery:{
            type: {
                short: shortType,
                code: typeCode,
            },
            schedule,
        },
        pageURL,
        address,
        ...others
    } = props;

    const isDelivery = typeCode === 'delivery';
    const isPickup = typeCode === 'pickup';
    const isReserve = typeCode === 'reserve';

    let optionDetails = '';
    if(isDelivery || isPickup){
        if(schedule){
            optionDetails = ` ${
                schedule.day
            } ${
                schedule.monthName.substr(0, 3)
            }, ${
                schedule.hour
            }:${
                schedule.minute
            } ${
                schedule.meridiem
            }`
        } else {
            optionDetails = ', As Soon As Possible'
        }
    }
    if(isReserve){
        optionDetails = ", Dine Wait Free";
    }

    return (
        <div 
        	className={cn(
        		'options-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <List className="list">
                <CustomListItem
                    icon={
                        <AccessAlarmsIcon />
                    }
                >
                    {shortType}
                    {optionDetails}
                </CustomListItem>
                {(Boolean(address) || !isDelivery) ? (
                    <CustomListItem
                        className="address"
                        
                        icon={
                            <LocationOnIcon />
                        }
                        iconAlign="self-start"
                    >
                        <div className="text">
                            <span className="main">
                                {isDelivery ? ( 
                                    `${address.number} ${address.street}`
                                ) : (
                                    `${storeStreetAddress}`
                                )}
                            </span>
                            <span className="sub">
                                {isDelivery ? (
                                    `${address.city && address.city + ','} ${address.stateCode} ${address.zipCode}`
                                ) : (
                                    `${storeCity}, ${storeState} ${storeZipCode}`
                                )}
                            </span>
                            {isDelivery ? (
                                <Link 
                                    className="sub green"
                                    to={{
                                        pathname: `/${ORDER_OPTIONS_PAGE_URL()}`,
                                        state: { from: `${pageURL}` }
                                    }}
                                >
                                    Add Delivery
                                </Link>
                            ) : (
                                <Link 
                                    className="sub green"
                                >
                                    See Direction
                                </Link>
                            )}
                        </div>
                    </CustomListItem>
                ) : (
                    <CustomListItem
                        className="address"
                        
                        icon={
                            <LocationOnIcon />
                        }
                        iconAlign="self-start"
                    >
                        <div className="text">
                            <span className="main">
                                No Address Found
                            </span>                    
                            <Link 
                                className="sub green"
                                to={{
                                    pathname: `/${ORDER_OPTIONS_PAGE_URL()}`,
                                    state: { from: `${pageURL}` }
                                }}
                            >
                                Click to add
                            </Link>
                        </div>
                    </CustomListItem>
                )}
            </List>            
        </div>
    );
}