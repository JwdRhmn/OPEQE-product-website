import React, { useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import AnimatedSwitch from "../AnimatedSwitch";

import {
    HOME_PAGE_URL,
    PROFILE_PAGE_URL,
    PROFILE_PAYMENT_LIST_PAGE_URL,
    PROFILE_PROMO_PAGE_URL,
    PROFILE_INVITE_PAGE_URL
} from "../../config/routing";

import logOut from "../../../store/actions/user/logOut";

import Grid from "@material-ui/core/Grid";

import Dashboard from "./components/Dashboard";
import selectUserData from "../../../store/selectors/user/selectUserData";
import ProfilePayment from "../ProfilePayment";
import ProfilePromo from "../ProfilePromo";
import ProfileSettings from "../ProfileSettings";
import ProfileInvite from "../ProfileInvite";

import isMobile from "../../../functions/isMobile";

function Index(props) {
    const {
        className,
        style,
        history,
        location,
        match,
        user: { data: user },
        logOut,
        staticContext,
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 8,
        md: 6,
        lg: 5,
        xl: 5
    };

    function handleLogOut() {
        logOut();
        history.replace(`/${HOME_PAGE_URL()}`);
    }

    return (
        <Grid
            className={cn("profile-page-l1", className)}
            style={{
                ...style
            }}
            container
            justify="center"
            {...others}
        >
            <Grid item container justify="center" {...breakpoints}>
                <AnimatedSwitch>
                    <Route
                        path={`/${PROFILE_PAGE_URL()}`}
                        exact
                        render={routerProps => (
                            <Dashboard
                                avatarProps={{
                                    fname: user.firstName,
                                    lname: user.lastName,
                                    date: user.membership
                                }}
                                bodyProps={{
                                    onLogOut: handleLogOut,
                                    basePath: PROFILE_PAGE_URL()
                                }}
                                isMobile={isMobile}
                            />
                        )}
                    />
                    <Route
                        path={`/${PROFILE_PROMO_PAGE_URL()}`}
                        render={routerProps => <ProfilePromo />}
                    />
                    <Route
                        path={`/${PROFILE_PAYMENT_LIST_PAGE_URL()}`}
                        render={routerProps => (
                            <ProfilePayment
                                basePath={`/${PROFILE_PAGE_URL()}/payment`}
                                {...routerProps}
                            />
                        )}
                    />
                    <Route
                        path={`/${PROFILE_PAGE_URL()}/settings`}
                        render={routerProps => (
                            <ProfileSettings
                                basePath={`/${PROFILE_PAGE_URL()}/settings`}
                                breakpoints={breakpoints}
                                {...routerProps}
                            />
                        )}
                    />
                    <Route
                        path={`/${PROFILE_INVITE_PAGE_URL()}`}
                        render={routerProps => (
                            <ProfileInvite referralCode={user.referral} />
                        )}
                    />
                    <Redirect to={`/${PROFILE_PAGE_URL()}`} />
                </AnimatedSwitch>
            </Grid>
        </Grid>
    );
}

export default connect(
    state => {
        return {
            user: selectUserData(state)
        };
    },
    {
        logOut
    }
)(Index);
