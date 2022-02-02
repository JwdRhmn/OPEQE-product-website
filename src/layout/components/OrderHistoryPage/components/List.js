import React from 'react';
import cn from "classnames";

import ReceiptIcon from '@material-ui/icons/Receipt';

import EmptyListIcon from "../../EmptyListIcon";


import Item from "./Item";

import isMobile from "../../../../functions/isMobile";

export default function(props) {
	const { 
        className, 
        style,
        location,
        history,
        staticContext,
        items=[],
        type,
        onAction,
        ...others
    } = props;
    
    return (
        <div 
        	className={cn(
        		'list-l2',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            {items.length ? (
                items.map(
                    item => (
                        <Item 
                            key={item.id}
                            type={type}
                            image={item.image} 
                            date={item.date}
                            id={item.id}
                            onAction={onAction}
                            status={'isprepared'}
                            orderType={item.type}
                        />
                    )
                )
            ) : (
                <EmptyListIcon 
                    icon={ReceiptIcon}
                />
            )}
        </div>
    );
}


// issubmitted
// isdelayed
// isconfirmed
// ischarged
// isprepared
// ispickedup
// isdelivered
// iscomplete
// isready
// iscanceledbydriver
// iscanceledbycustomer
// iscanceledbystore
// iscanceled