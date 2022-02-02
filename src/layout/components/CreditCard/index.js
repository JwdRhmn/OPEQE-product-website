import React from "react";
import cn from "classnames";

import CreditCardIcon from "@material-ui/icons/CreditCard";

import CustomListItem from "../CustomListItem";

export default function(props) {
    const {
        className,
        style,
        icon,
        number,
        expDate,
        state,
        zipCode,
        ...others
    } = props;
    return (
        <CustomListItem
            className={cn("credit-card-l1", className)}
            style={{
                ...style
            }}
            {...others}
            icon={
                icon ? (
                    <img
                        src={require(`../../assets/images/icons/${icon}.png`)}
                    />
                ) : (
                    <CreditCardIcon />
                )
            }
            iconProps={{
                className: "card-icon"
            }}
        >
            <div className="content">
                <span className="primary text">{number}</span>

                <span className="secondary text">
                    {expDate} {state} {zipCode}
                </span>
            </div>
        </CustomListItem>
    );
}
