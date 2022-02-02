import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CustomListItem from "./CustomListItem";

export default function(props) {
	const {  
        className, 
        style,  
        fname,
        lname,    
        date,  
        onLogOut,
        basePath,
        ...others
    } = props;

    return (
        <List 
        	style={{
                ...style 
            }}
            className={cn(
                "body-l2",
                className,
            )}            
            {...others}
        >
            <CustomListItem                
                component={Link}
                to={`/${basePath}/promo`}
                icon={<CardGiftcardIcon />}
                text="Promos and Credits"
            />
            <CustomListItem                
                component={Link}
                to={`/${basePath}/payment`}
                icon={<PaymentIcon />}
                text="Payment"
            />
            <CustomListItem                
                component={Link}
                to={`/${basePath}/settings`}
                icon={<AccountBoxIcon />}
                text="Settings"
            />
            <CustomListItem                
                className="invite"
                textProps={{
                    className: "text"
                }}
                component={Link}
                to={`/${basePath}/invite`}
                text="Invite your friends"
            />
            <CustomListItem                
                icon={<HelpIcon />}
                text="Support"
            />
            <CustomListItem                
                icon={<InfoIcon />}
                text="About"
            />
            <CustomListItem                
                icon={<PowerSettingsNewIcon />}
                text="Logout"
                onClick={onLogOut}
            />
        </List>                        
    );
}            