import React from "react";
import cn from "classnames";
import{ NavLink } from "react-router-dom";

import Button from "../../DefaultButton";

export default props => {
    const {
    	to,
        className,
        style,
        ...others
    } = props;
    return (
        <Button
        	component={to && NavLink}
        	to={to}
            className={cn("button-l2", className)}
            style={{
                ...style
            }}
            theme="light"
            {...others}
        />
    )
}