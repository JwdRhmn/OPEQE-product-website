import "./styles/index.scss";
import 'antd/dist/antd.css';
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import selectBan from "../store/selectors/demo/selectBan";

import { Provider as GlobalStateProvider } from "./state";

import { ConectedPrivateRoute } from "./components/PrivateRoute";
import AnimatedSwitch from "./components/AnimatedSwitch";

import ProductPage from "./components/ProductPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import OrderOptionsPage from "./components/OrderOptionsPage";
import NotFoundPage from "./components/NotFoundPage";
import ReservationListPage from "./components/ReservationListPage";
import ReservationOptionsPage from "./components/ReservationOptionsPage";
import ProfilePage from "./components/ProfilePage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import Footer from "./components/Footer";
import MainNav from "./components/MainNav";
import FilteredItemsPage from "./components/FilteredItemsPage";
import BannedPage from "./components/BannedPage";

import Gauge from "./components/Gauge";

import {
    LOG_IN_PAGE_URL,
    PRODUCT_PAGE_URL,
    SHOPPING_CART_PAGE_URL,
    ORDER_OPTIONS_PAGE_URL,
    RESERVATION_LIST_PAGE_URL,
    RESERVATION_OPTIONS_PAGE_URL,
    PROFILE_PAGE_URL,
    ORDER_HISTORY_PAGE_URL,
    ITEM_SEARCH_PAGE_URL
} from "./config/routing/";


import isMobile from "../functions/isMobile";
import isDemo from "../functions/isDemo";

const PublicRoute = isDemo ? ConectedPrivateRoute : Route;

function Index(props) {
    const { ban } = props;

    return (
        <>
            {(ban.store || ban.user) ? (
                <BannedPage type={ban.user ? 'user' : 'store'} />
            ) : (
                <GlobalStateProvider>
                    <MainNav />
                    <AnimatedSwitch isPage>
                        <ConectedPrivateRoute
                            path={`/${SHOPPING_CART_PAGE_URL()}`}
                            component={ShoppingCartPage}
                        />
                        <ConectedPrivateRoute
                            path={`/${RESERVATION_LIST_PAGE_URL()}`}
                            exact
                            component={ReservationListPage}
                        />
                        <ConectedPrivateRoute
                            path={`/${RESERVATION_OPTIONS_PAGE_URL()}`}
                            component={ReservationOptionsPage}
                        />
                        <ConectedPrivateRoute
                            path={`/${PROFILE_PAGE_URL()}`}
                            component={ProfilePage}
                        />
                        <ConectedPrivateRoute
                            path={`/${ORDER_HISTORY_PAGE_URL()}`}
                            component={OrderHistoryPage}
                        />
                        <PublicRoute path="/" exact component={HomePage} />
                        <PublicRoute
                            path={`/${PRODUCT_PAGE_URL()}`}
                            component={ProductPage}
                        />
                        <PublicRoute
                            path={`/${ORDER_OPTIONS_PAGE_URL()}`}
                            component={OrderOptionsPage}
                        />
                        <PublicRoute
                            path={`/${ITEM_SEARCH_PAGE_URL()}`}
                            component={FilteredItemsPage}
                        />
                        <Route path={`/${LOG_IN_PAGE_URL()}`} component={SignUpPage} />
                        <Route component={NotFoundPage} />
                    </AnimatedSwitch>
                    {!isMobile && (
                        <Footer />     
                    )}
                </GlobalStateProvider>
            )}
        </>
    );
}


export default connect( state => ({
    ban: selectBan(state),
}),{

})(Index);