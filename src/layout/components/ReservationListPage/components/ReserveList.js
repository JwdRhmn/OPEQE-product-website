import React from 'react';
import cn from "classnames";

import ReserveListItem from "./ReserveListItem";
import EmptyListIcon from "../../EmptyListIcon";

import getDate from "../../../../functions/formattedDate";

import LocalDiningIcon from '@material-ui/icons/LocalDining';

import getConfirmationCode from "../../../../functions/getConfirmationCode";

export default function(props) {
	const { 
        className, 
        style,
        list,
        onCancel,
        onDine,
        loadingId,
        ...others
    } = props;


    return (
        <div 
        	className={cn(
        		'reserve-list-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            {list.length ? (
                list.map(
                    item => {
                        const date = getDate( new Date(item.date) );

                        return (
                            <ReserveListItem 
                                key={item.id}
                                id={item.id}
                                code={getConfirmationCode(item.id)}
                                day={date.day}
                                monthName={date.monthName}
                                weekDay={date.weekDay}
                                time={`${date.hour12}:${date.minute} ${date.meridiem}`}
                                count={item.size}
                                waitList={item.isWaitlist}
                                loading={item.id === loadingId}
                                onCancel={onCancel}
                                hideDine={item.orderId}
                                onDine={onDine}
                            />
                        ) 
                    }
                )
            ) : (
                <EmptyListIcon 
                    icon={LocalDiningIcon}
                />
            )}              
                      
        </div>
    );
}