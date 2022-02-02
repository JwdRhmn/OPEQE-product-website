import React from 'react';
import cn from "classnames";
import PhoneInput from "material-ui-phone-number";

import { phoneNumberConfig } from "../../config/store";

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        label,
        staticContext,
        ...others
    } = props;

    return (
        <PhoneInput 
            inputClass={cn(
                'phone-input-l1',
                className
            )} 
        	style={{
                ...style 
            }}
            inputProps={{
                dir: "ltr"
            }}
            label={label}
            disableAreaCodes
            countryCodeEditable={false}
            {...phoneNumberConfig}
            {...others}
        />
    );
}