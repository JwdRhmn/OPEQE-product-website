import React from 'react';
import cn from "classnames";

import Button from "../DefaultButton";

import StyledNotification from "../StyledNotification";

import {
 contactOPEQE,
} from "../../config/opeqe";

export default function(props) {
    const { 
        className, 
        style,
        refrenceCode,
        onClose,
        clearCart,
        img,
        ...others
    } = props;

    return (
        <StyledNotification 
            className={cn(
                "not-demo-mail-notification-l1",
                className,
            )}   
            style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            <div className="body">                
                <div className="title">
                    Not A Demo Mail
                </div>
                <br/>
                <div className="sub-title">
                        Please enter the email address which received invitation for demo account.            
                </div>
                <div className="text">
                    Invitations will expire within 30 days, to reinstate the expired invitation and all other inquiries please contact Opeqe at
                    <br/>
                    <span className="green">
                        {contactOPEQE}
                    </span>
                </div>
            </div>
            <br/>
            <Button
                theme="dark"  
                width="200px" 
                onClick={onClose}            
            >
                Got it
            </Button>
        </StyledNotification>
    );
}

