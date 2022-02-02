import React from 'react';
import cn from "classnames";

import Button from "../DefaultButton";

import StyledNotification from "../StyledNotification";
import ItemReceipt from "../ItemReceipt";
import TotalOrderReceipt from "../TotalOrderReceipt";

export default function(props) {
    const { 
        className, 
        style,
        onClose,
        itemReceiptProps,
        totalReceiptProps,
        date,
        code,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "order-receipt-notification-l1",
                className,
            )}   
            style={{
                ...style 
            }}
            onClose={onClose}
            PaperProps={{
                className: "paper",
            }}
            {...others}
        >
            <div className="header">
                <div className="title">
                    Order Receipt
                </div>
                <div className="date">
                    {date}
                </div>
                <div className="id">
                    Order #{code}
                </div>
            </div>
            <div className="body">
                <ItemReceipt 
                    noItemsText="Empty Cart"
                    noOptions
                    {...itemReceiptProps}
                />
                <TotalOrderReceipt                     
                    {...totalReceiptProps}
                />
            </div>
            <Button
                theme="dark"  
                width="200px" 
                onClick={onClose}            
            >
                Close
            </Button>
        </StyledNotification>
    );
}

