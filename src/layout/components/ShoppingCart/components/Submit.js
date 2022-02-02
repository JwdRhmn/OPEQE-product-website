import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";

import {    
    HOME_PAGE_URL,
    PROFILE_PAYMENT_LIST_PAGE_URL,
    ORDER_OPTIONS_PAGE_URL
} from "../../../config/routing";

export default function({ 
        className, 
        style,
        noPayment,
        back,
        onSubmit,
        submitDisabled,
        loading,
        noAddress,
        ...others
}) {
    

    return (
        <BottomFixedContainer 
            className={cn(
                'submit-l2',
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            {back ? (
                <Button
                    containerProps={{
                        className: 'button-container',
                    }}
                    component={Link}
                    to={`/${HOME_PAGE_URL()}`}
                >
                    Browse Our Menu     
                </Button>
            ) : (            
                noPayment ? (
                    <Button
                        containerProps={{
                            className: 'button-container',
                        }}
                        component={Link}
                        to={`/${PROFILE_PAYMENT_LIST_PAGE_URL()}`}
                    >
                        Add Payment   
                    </Button>
                ) : (
                    noAddress ? (
                        <Button
                            containerProps={{
                                className: 'button-container',
                            }}
                            component={Link}                            
                            to={`/${ORDER_OPTIONS_PAGE_URL()}`}
                        >
                            Add Delivery Address   
                        </Button>
                    ) : (
                        <Button
                            containerProps={{
                                className: 'button-container',
                            }}
                            theme="green"
                            disabled={submitDisabled}
                            onClick={onSubmit}
                            waiting={loading}
                        >
                            Place Order        
                        </Button>
                    )
                )
            )}
        </BottomFixedContainer>
    );
}
