import React from "react";
import cn from "classnames";
import queryString from "query-string";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import AnimatedBody from "./components/AnimatedBody";
import Button from "./components/Button";

import useRouter from "../../hooks/useRouter";

import Logo from "../Logo";

import {
    HOME_PAGE_URL,
    RESERVATION_LIST_PAGE_URL,
    ORDER_OPTIONS_PAGE_URL,
    LOG_IN_PAGE_URL,
    PROFILE_PAGE_URL,
    SHOPPING_CART_PAGE_URL,
    ORDER_HISTORY_PAGE_URL,
    ORDER_HISTORY_RECENT_PAGE_URL,
    ITEM_SEARCH_PAGE_URL,
    PRODUCT_PAGE_URL
} from "../../config/routing";

export default function Index(props) {
    const {
        className,
        style,
        ...others
    } = props;

    const { history, location, matchPath } = useRouter();

    function goBack() {
        history.goBack();
    }

    const mobileHeader = getHeader({
        history,
        location,
        matchPath
    });

    if (mobileHeader.hide) {
        return null;
    }

    const key = mobileHeader.key;

    return (
        <Grid
            className={cn(
                "mobile-top-l1", 
                {"border-bottom": mobileHeader.borderBottom},
                className
            )}
            style={{
                ...style
            }}
            container
            justify="space-between"
            alignItems="center"
            {...others}
        >
            {!mobileHeader.noBack && (
                <span className="start">
                    {!mobileHeader.hideBack && (
                        <IconButton
                            className="button"
                            color="inherit"
                            onClick={goBack}
                        >
                            <ArrowBackIcon className="icon" />
                        </IconButton>
                    )}
                </span>
            )}
            <TransitionGroup className={cn("animation-container")}>
                <CSSTransition
                    key={key}
                    timeout={{ enter: 400, exit: 400 }}
                    classNames="swipe"
                >
                    <AnimatedBody
                        middle={mobileHeader.middle}
                        end={mobileHeader.end}
                        noEnd={mobileHeader.noEnd}
                        child={mobileHeader.child}
                    />
                </CSSTransition>
            </TransitionGroup>
        </Grid>
    );
}

const getHeader = ({
    history,
    location,
    matchPath
}) => {
    const currentPath = location.pathname;

    const checkUrl = (url, exact) =>
        matchPath(currentPath, createRoute(url, exact));

    let out = {};

    if (checkUrl(HOME_PAGE_URL(), true)) {
        out = {
            middle: {
                main: (<Logo width={130} />),                
            },
            borderBottom: true,
            key: '1'
        };
    } else if (checkUrl(ITEM_SEARCH_PAGE_URL())) {
        const { filterValue } = queryString.parse(location.search, {
            arrayFormat: "bracket"
        });
        out = {
            middle: {
                main: "Search",
                sub: filterValue && filterValue
            },
            key: '2'
        };
    } else if (checkUrl(RESERVATION_LIST_PAGE_URL())) {
        out = {
            middle: {
                main: "Reservation"
            },
            key: '3'
        };
    } else if (checkUrl(LOG_IN_PAGE_URL())) {
        out = {
            middle: {
                main: "Sign In"
            },
            key: '4'
        };
    } else if (checkUrl(ORDER_OPTIONS_PAGE_URL())) {
        out = {
            middle: {
                main: "Order Options"
            },
            key: '5'
        };
    } else if (checkUrl(PROFILE_PAGE_URL())) {
        out = {
            middle: {
                main: "Profile"
            },
            key: '6'
        };
    } else if (checkUrl(SHOPPING_CART_PAGE_URL())) {
        out = {
            middle: {
                main: "Shopping Cart"
            },
            key: '7'
        };
    } else if (checkUrl(ORDER_HISTORY_PAGE_URL())) {
        out = {
            middle: {
                main: "Order History",
                sub: <Button theme="light" to={`/${ORDER_HISTORY_RECENT_PAGE_URL()}`}>Recent Orders</Button>
            },
            key: '8'
        };
    } else if (checkUrl(PRODUCT_PAGE_URL())) {
        out = {
            middle: {
                main: "Product Details",
            },
            key: '9'
        };
    } else {
        out = {
            hide: true
        };
    }

    if (
        checkUrl(HOME_PAGE_URL(), true) ||
        checkUrl(RESERVATION_LIST_PAGE_URL(), true) ||
        checkUrl(PROFILE_PAGE_URL(), true) ||
        checkUrl(SHOPPING_CART_PAGE_URL(), true) ||
        checkUrl(ORDER_HISTORY_PAGE_URL(), true)
    ) {
        out.hideBack = true;
    }

    return out;
};

const createRoute = (url, exact) => ({
    path: `/${url}`,
    exact
});
