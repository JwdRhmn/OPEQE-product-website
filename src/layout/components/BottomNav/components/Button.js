import React from 'react';
import { Link } from "react-router-dom";
import cn from "classnames";

import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

export default function(props) {
	const { 
        className, 
        style,
        children,
        icon: Icon,
        active,
        badge,
        ...others
    } = props;


    return (
        <Button 
            component={Link}
        	className={cn(
        		'button-l2',
                {'active': active},
        		className
        	)} 
        	style={{
                ...style 
            }}
            replace
            {...others}
        >
            <Badge
                classes={{
                    badge: "badge"
                }}
                badgeContent={badge}
            >
                <Icon fontSize="inherit" />
            </Badge>
        </Button>
    );
}
