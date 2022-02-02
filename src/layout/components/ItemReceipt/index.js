import React, { useState } from 'react';
import cn from "classnames";



import Item from "./components/Item";


export default function(props) {
    const { 
        className, 
        style,
        items=[],
        onFav,
        onDel,   
        noItemsText,     
        noOptions,
        onInc,
        onDec,
        max,
        ...others
    } = props;


    function handleInc(item){
        if(item.quantity >= max){
            return;
        }
        onDec(item.key, item.quantity + 1);
    }
    function handleDec(item){
        if(item.quantity <= 1){
            return;
        }
        onDec(item.key, item.quantity - 1);
    }

    return (
        <div 
            className={cn(
                'item-receipt-l1',
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            {items.length ? (
                    items.map( 
                        (item, index) => {
                            
                            return <Item 
                                key={item.key} 
                                index={index} 
                                quantity={item.quantity}
                                onFav={() => onFav(item.key)}
                                onInc={() => handleInc(item)}
                                onDec={() => handleDec(item)}
                                onDel={() => onDel(item.key)}
                                noOptions={noOptions}
                                {...item} 
                            /> 
                        }
                    )
                ) : (
                    <div className="no-item" > 
                        {noItemsText} 
                    </div>
                )
            }
        </div>
    );
}