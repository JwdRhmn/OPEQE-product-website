import React, { useEffect, useState } from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { RESERVATION_LIST_PAGE_TOP_PROMOTION_PROPS } from "../../config/layout";

import Grid from '@material-ui/core/Grid';

import cancelOrder from "../../../store/actions/cart/cancelOrder";
import selectCancelOrder from "../../../store/selectors/cart/selectCancelOrder";
import fetchOrderHistory from "../../../store/actions/cart/fetchOrderHistory";
import selectOrderHistory from "../../../store/selectors/cart/selectOrderHistory";

import List from "./components/List";

import getConfirmationCode from "../../../functions/getConfirmationCode";
import isMobile from "../../../functions/isMobile";


import OrderReceiptNotification from "../OrderReceiptNotification";
import CancelOrderNotification from "../CancelOrderNotification";
import OrderCenceledNotification from "../OrderCenceledNotification";
import ReorderNotification from "../ReorderNotification";
import OrderReceiptPage from "../OrderReceiptPage";
import PageTopPromotion from "../PageTopPromotion";
import AnimatedSwitch from "../AnimatedSwitch";


import useReduxCallback from "../../hooks/useReduxCallback";

function Index(props) {
	const { 
        className, 
        style,
        fetchOrderHistory,
        orderHistory: {
            data: historyData,
        },
        cancelOrder,
        cancelResult: {
            status: cancelStatus,
            data: cacnelData,
        },
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;


    const [ showReceipt, setShowReceipt ] = useState(false);
    const [ showCancelPrompt, setShowCancelPrompt ] = useState(false);
    const [ showCancelledNotif, setShowCancelledNotif ] = useState(false);
    const [ showRorderNotif, setShowRorderNotif ] = useState(false);
    const [ selectedOrder, setSelectedOrder ] = useState({});
    useReduxCallback(cancelDone, null, cancelStatus);

    useEffect(() => {
        fetchOrderHistory();
    }, []);


    function handleAction(action, id, type){
        const order = historyData[type].find(item => item.id === id);

        if(!order){
            return;
        }

        setSelectedOrder(order);
        switch(action){
            case 'receipt': {
                if(isMobile){
                    history.push(`${basePath}/receipt`);
                } else {
                    setShowReceipt(true);
                }
                break;
            }
            case 'cancel': {
                setShowCancelPrompt(true);
                break;
            }
            case 'reorder': {                
                break;
            }
            default: {
                break;
            }
        }
    }

    function handleCancel(){
        cancelOrder(selectedOrder.id);
    }
    function cancelDone(){
        if(cacnelData && cacnelData.isSucceeded){
            setShowCancelPrompt(false);
            setTimeout(() => setShowCancelledNotif(true), 500);
        }
    }


    const breakpoints = {
        xs: 11,
        sm: 11,
        md: 11,
        lg: 10,
        xl: 9
    };

    const basePath = match.url;

    const orderConfirmationCode = selectedOrder.id && getConfirmationCode(selectedOrder.id);
    const cancelConfirmationCode = cacnelData.confirmation && getConfirmationCode(cacnelData.confirmation);

    return (
        <>
            <OrderReceiptNotification
                open={showReceipt}
                onClose={() => setShowReceipt(false)}
                itemReceiptProps={{
                    items: selectedOrder.items
                }}
                totalReceiptProps = {{
                    subTotal: selectedOrder.price,
                    discounts: selectedOrder.discount,
                    tax: selectedOrder.tax,
                    fees: selectedOrder.fee,
                }}
                code={orderConfirmationCode}
                date={selectedOrder.date}
            />
            <CancelOrderNotification
                open={showCancelPrompt}
                onClose={() => setShowCancelPrompt(false)}
                img={selectedOrder.image}
                itemCount={selectedOrder.items && selectedOrder.items.length}
                loading={cancelStatus === 'pending'}
                onCancel={handleCancel}
            />
            <OrderCenceledNotification 
                open={showCancelledNotif}
                onClose={() => setShowCancelledNotif(false)}
                code={cancelConfirmationCode}
            />
            <ReorderNotification
                open={showRorderNotif}
                onClose={() => setShowRorderNotif(false)}
                img={selectedOrder.image}
                // currentItemCount={} //?
                // onReorder={} //?
                // loading={} //?
            />
            <Grid 
                className={cn(
                    'order-history-page-l1',
                    {'mobile': isMobile},
                    className
                )} 
                style={{
                    ...style 
                }}
                container
                justify="center"
                {...others}
            >
                {!isMobile && (
                  <PageTopPromotion
                    className="promo"
                    {...RESERVATION_LIST_PAGE_TOP_PROMOTION_PROPS}
                  />
                )}
                <Grid
                    className="part-container"
                    item
                    container
                    justify="center"
                    {...breakpoints}
                >
                    <AnimatedSwitch>
                        <Route 
                            path={`${basePath}`}
                            exact
                            render={routerProps => (
                                <List     
                                    items={historyData.upcoming}     
                                    onAction={handleAction}
                                    type="upcoming"
                                />
                            )}
                        />
                        <Route 
                            path={`${basePath}/recent`}
                            render={routerProps => (
                                <List 
                                    items={historyData.recent}      
                                    onAction={handleAction}
                                    type="recent"
                                />
                            )}
                        />
                        <Route 
                            path={`${basePath}/receipt`}
                            render={routerProps => (
                                <OrderReceiptPage 
                                    items={historyData.recent}   
                                    type="receipt"
                                    itemReceiptProps={{
                                        items: selectedOrder.items
                                    }}
                                    totalReceiptProps = {{
                                        subTotal: selectedOrder.price,
                                        discounts: selectedOrder.discount,
                                        tax: selectedOrder.tax,
                                        fees: selectedOrder.fee,
                                    }}
                                    code={orderConfirmationCode}
                                    date={selectedOrder.date}
                                />
                            )}
                        />
                        <Redirect to={`/${basePath}`} />   
                    </AnimatedSwitch>
                </Grid>
            </Grid>
        </>
    );
}


export default connect( state => {
    return {
        orderHistory: selectOrderHistory(state),
        cancelResult: selectCancelOrder(state),
    }
},{
    fetchOrderHistory,
    cancelOrder
})(Index);