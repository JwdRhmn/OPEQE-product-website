import React from "react";
import cn from "classnames";
import { Redirect } from "react-router-dom";

import ItemReceipt from "../ItemReceipt";
import TotalOrderReceipt from "../TotalOrderReceipt";

import { ORDER_HISTORY_PAGE_URL } from "../../config/routing";

import isMobile from "../../../functions/isMobile";


export default function(props) {
    const {
        className,
        style,
        location,
        match,
        history,
        staticContext,
        itemReceiptProps,
        totalReceiptProps,
        date,
        code,
        ...others
    } = props;


    if (!code) {
        return <Redirect to={`/${ORDER_HISTORY_PAGE_URL()}`} />;
    }

    return (
        <div
            className={cn(
                "order-receipt-page-l1", 
                {"mobile": isMobile},
                className
            )}
            style={{
                ...style
            }}
            {...others}
        >
            <div className="header">
                <div className="date">{date}</div>
                <div className="id">Order #{code}</div>
            </div>
            <div className="body">
                <ItemReceipt
                    noItemsText="Empty Cart"
                    noOptions
                    {...itemReceiptProps}
                />
                <TotalOrderReceipt {...totalReceiptProps} />
            </div>
        </div>
    );
}
