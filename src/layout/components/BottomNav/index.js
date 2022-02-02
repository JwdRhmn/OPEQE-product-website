import React from 'react';
import cn from "classnames";

import Grid from '@material-ui/core/Grid';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';

import Button from './components/Button';

import useRouter from "../../hooks/useRouter";
import OpeqeLogo from "../OpeqeLogo";

import {
    HOME_PAGE_URL,
    RESERVATION_LIST_PAGE_URL,
    ORDER_HISTORY_PAGE_URL,
    PROFILE_PAGE_URL,
    SHOPPING_CART_PAGE_URL,
} from "../../config/routing";
import {
    noFindTableSupport,
    noWaitToBeSeatedSupport
} from "../../config/store";


export default function(props) {
	const { 
        cartBadge,
        className, 
        style,
        ...others
    } = props;

    const {
        location,
        matchPath,
    } = useRouter();

    const currentPath = location.pathname;

    

    const buttons = [
        {
            label: "Menu",
            icon: LocalDiningIcon,
            route: {
                path: `/${HOME_PAGE_URL()}`,
                exact: true,
            }
        },
        {
            label: "Orders",
            icon: ReceiptIcon,
            route: {
                path: `/${ORDER_HISTORY_PAGE_URL()}`
            }
        },
        {
            label: "Cart",
            icon: ShoppingBasketIcon,
            badge: cartBadge,
            route: {
                path: `/${SHOPPING_CART_PAGE_URL()}`
            }
        },        
        {
            label: "Profile",
            icon: PersonIcon,
            route: {
                path: `/${PROFILE_PAGE_URL()}`
            }
        }
    ]

    if(!noFindTableSupport || !noWaitToBeSeatedSupport) {
        buttons.splice(3, 0,
            {
                label: "Reserve",
                icon: EventIcon,
                route: {
                    path: `/${RESERVATION_LIST_PAGE_URL()}`
                }
            }
        );
    }



    return (
        <div 
        	className={cn(
        		'bottom-nav-l1',
        		className
        	)} 
        	style={{
                ...style 
            }} 
            {...others}
        >
            <Grid
                className="buttons"
                container
                justify="space-between" 
            >
                {buttons.map(
                    button => (
                        <Button
                            key={button.label}
                            className="button" 
                            label={button.label} 
                            value={button.label.toLowerCase()}
                            icon={button.icon}
                            badge={button.badge}
                            active={
                                matchPath(currentPath, button.route)
                            }
                            to={button.route.path}
                        />
                    )
                )}  
            </Grid>
            <Grid container justify="space-around" className="opeqe">
                <span>
                    Powered By <OpeqeLogo width={30} />
                </span>
                <span>
                    www.opeqe.com
                </span>
            </Grid>        
        </div>
    );
}
