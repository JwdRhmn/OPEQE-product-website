import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import setDeliveryCondition from "../../../store/actions/user/setDeliveryCondition";
import getReserveHistory from "../../../store/actions/reserve/getReserveHistory";
import cancelReserve from "../../../store/actions/reserve/cancelReserve";
import selectCancelReserve from "../../../store/selectors/reserve/selectCancelReserve";
import selectReserveHistory from "../../../store/selectors/reserve/selectReserveHistory";

import Button from "../DefaultButton";
import BottomFixedContainer from "../BottomFixedContainer";
import CancelReserveNotification from "../CancelReserveNotification/";
import PageTopPromotion from "../PageTopPromotion";

import ReserveList from "./components/ReserveList";

import {
    RESERVATION_OPTIONS_PAGE_URL,
    RESERVATION_DETAILS_PAGE_URL,
    HOME_PAGE_URL
} from "../../config/routing";
import {
    noFindTableSupport,
    noWaitToBeSeatedSupport
} from "../../config/store";
import { RESERVATION_LIST_PAGE_TOP_PROMOTION_PROPS } from "../../config/layout";

import useReduxCallback from "../../hooks/useReduxCallback";

import getConfirmationCode from "../../../functions/getConfirmationCode";
import isMobile from "../../../functions/isMobile";

function Index(props) {
    const {
        className,
        style,
        getReserveHistory,
        cancelReserve,
        cancel: { status: cancelStatus, data: cancelData },
        reserveHistory: { list: reserveList },
        setDeliveryCondition,
        history,
        location,
        match,
        staticContext,
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 11,
        md: 11,
        lg: 10,
        xl: 9
    };

    const [showNotification, setShowNotification] = useState(false);
    useReduxCallback(cancel, null, cancelStatus);

    const [loadingId, setLoadingId] = useState(false);

    useEffect(() => {
        getReserveHistory();
    }, []);

    function handleCancel(id) {
        cancelReserve(id);
        setLoadingId(id);
    }

    function cancel() {
        setTimeout(() => setShowNotification(true), 700);
        setLoadingId();
    }

    function dineWaitFree(data) {
        setDeliveryCondition({
            type: "reserve",
            reserve: {
                id: data.id,
                size: data.count,
                isWaitlist: data.isWaitlist
            }
        });
        history.push(`/${HOME_PAGE_URL()}`);
    }

    const cancelId = cancelData.confirmation;
    const cancelConfirmation = cancelId && getConfirmationCode(cancelId);

    if (noFindTableSupport && noWaitToBeSeatedSupport) {
        return <Redirect to={`/${HOME_PAGE_URL()}`} />;
    }

    return (
        <>
            <CancelReserveNotification
                open={showNotification}
                onClose={() => setShowNotification(false)}
                refrenceCode={cancelConfirmation}
            />
            <Grid
                className={cn("reservation-list-page-l1", {'mobile': isMobile}, className)}
                style={{
                    ...style
                }}
                justify="center"
                container
                {...others}
            >
                {!isMobile && (
                    <PageTopPromotion
                        className="promo"
                        sortBy="event"
                        {...RESERVATION_LIST_PAGE_TOP_PROMOTION_PROPS}
                    />
                )}
                <Grid
                    className="body-container"
                    item
                    container
                    justify="center"
                    {...breakpoints}
                >
                    <ReserveList
                        list={reserveList}
                        onCancel={handleCancel}
                        loadingId={loadingId}
                        onDine={dineWaitFree}
                    />
                    <BottomFixedContainer className="main-buttons">
                        {!noFindTableSupport && (
                            <Button
                                containerProps={{
                                    className: "button-container"
                                }}
                                className="button"
                                to={`/${RESERVATION_OPTIONS_PAGE_URL()}`}
                                component={Link}
                            >
                                Find a Table
                            </Button>
                        )}
                        {!noWaitToBeSeatedSupport && (
                            <Button
                                containerProps={{
                                    className: "button-container"
                                }}
                                className="button"
                                to={`/${RESERVATION_DETAILS_PAGE_URL({
                                    isWait: true
                                })}`}
                                component={Link}
                                theme="gray"
                            >
                                Wait To Be Seated
                            </Button>
                        )}
                    </BottomFixedContainer>
                </Grid>
            </Grid>
        </>
    );
}

export default connect(
    state => {
        return {
            reserveHistory: selectReserveHistory(state),
            cancel: selectCancelReserve(state)
        };
    },
    {
        getReserveHistory,
        cancelReserve,
        setDeliveryCondition
    }
)(Index);
