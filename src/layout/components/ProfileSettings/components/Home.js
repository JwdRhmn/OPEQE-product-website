import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import PersonIcon from '@material-ui/icons/Person';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MailIcon from '@material-ui/icons/Mail';

import CustomListItem from "./CustomListItem";

export default function(props) {
    const {  
        className, 
        style,
        firstname,
        lastname,
        phone,
        email,
        basePath,
        ...others
    } = props;

    return (
        <div 
            style={{
                ...style 
            }}
            className={cn(
                "custom-list-item-l2",
                className,
            )}  
            {...others}
        >
            <CustomListItem 
                label="First Name"
                value={firstname}
                icon={<PersonIcon />}
                component={Link}
                to={`${basePath}/names?type=first`}
            />
            <CustomListItem 
                label="Last Name"
                value={lastname}
                icon={<PersonIcon />}
                component={Link}
                to={`${basePath}/names?type=last`}
            />
            <CustomListItem 
                label="Phone Number"
                value={phone}
                icon={<PhoneIphoneIcon />}
                component={Link}
                to={`${basePath}/phone`}
            />
            <CustomListItem 
                label="Password"
                value="******"
                icon={<FingerprintIcon />}
                component={Link}
                to={`${basePath}/pass?type=both`}
            />
            <CustomListItem 
                label="Email"
                value={email}
                icon={<MailIcon />}
                component={Link}
                to={`${basePath}/email`}
            />
        </div>                            
    );
}

