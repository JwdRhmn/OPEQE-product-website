import React from 'react';
import { Redirect } from "react-router-dom";

import isMobile from "../../../functions/isMobile";

export default ({ 
    component: Component, 
    ifMobile,
    ...rest 
}) => {

    if(
        (isMobile && !ifMobile)
        ||
        (!isMobile && ifMobile)
    ){
        return null;
    }

    return (
        <Redirect
            {...rest}
            component={Component}
        />
    );
}

