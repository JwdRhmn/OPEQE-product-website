import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import getUserAuth from "../../../store/selectors/user/getUserAuth";

import {
    LOG_IN_PAGE_URL,
} from "../../config/routing/";

export default function Index({ 
    component: Component, 
    auth,
    ...rest 
}) {

    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `/${LOG_IN_PAGE_URL()}`,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}


export const ConectedPrivateRoute = connect(state => {
    return {
        auth: getUserAuth(state),      
    }
})(Index);