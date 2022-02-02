import React from 'react';
import cn from "classnames";

import List from "@material-ui/core/List";

import CustomListItem from "../CustomListItem";

import currencify from "../../../functions/currencify";



export default function(props) {
    const { 
        className, 
        style,
        discounts=[],
        subTotal=0,
        fees=[],
        ...others
    } = props;

    return (
        <div 
            className={cn(
                'total-order-receipt-l1',
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            <List className="receipt-details">
                <CustomListItem
                    className="item"
                    action={currencify(subTotal)}
                    noIcon
                    noBorder                   
                >
                    Subtotal
                </CustomListItem>  
                {fees.map((fee, index) => (
                    <CustomListItem
                        key={index}
                        className="item"
                        action={currencify(fee.amount)} 
                        noIcon
                        noBorder                   
                    >
                        {fee.title}
                    </CustomListItem> 
                ))}                
                {discounts.map(
                    (discount, index) => (
                        <CustomListItem
                            key={discount.id || index}
                            className="item"
                            action={currencify(-discount.amount)}                
                            noIcon
                            noBorder  
                        >
                            {discount.title}
                        </CustomListItem> 
                    )
                )}
                <CustomListItem
                    className="total"
                    action={
                        <span className="price">
                            {currencify(
                                getTotal({
                                    discounts,
                                    subTotal,
                                    fees
                                })
                            )}
                        </span>
                    }   
                    noIcon                                    
                >
                    TOTAL
                </CustomListItem>                 
            </List>
        </div>
    );
}




function getTotal({
    discounts=[],
    fees,
    subTotal
}){
    const taxSum = fees.reduce((total, fee) => (total + fee.amount), 0)
    let total = subTotal + taxSum;

    total += discounts.reduce( 
        (totalDiscounts, discount) => (totalDiscounts - discount.amount) 
    , 0);

    return total;
}
