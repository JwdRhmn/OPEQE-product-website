import React, { useState, useEffect } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import Header from "./components/Header"
import Map from "./components/Map"
import Options from "./components/Options"
import ProductOptions from "./components/ProductOptions"
import Payment from "./components/Payment"
import Submit from "./components/Submit"

import fetchPaymentMethods from "../../../store/actions/user/fetchPaymentMethods";
import setItemQuantity from "../../../store/actions/cart/setItemQuantity";
import selectDefaultPaymentMethod from "../../../store/selectors/user/selectDefaultPaymentMethod";
import getCartSummary from "../../../store/selectors/cart/getCartSummary";
import getCheckOutStatus from "../../../store/selectors/cart/getCheckOutStatus";
import getUserDefaultAddress from "../../../store/selectors/user/getUserDefaultAddress";
import getCartItemTotals from "../../../store/selectors/cart/getCartItemTotals";
import removeFromCart from "../../../store/actions/cart/removeItem";
import placeOrder from "../../../store/actions/cart/placeOrder";
import getUserDeliveryCondition from "../../../store/selectors/user/getUserDeliveryCondition";
import selectUserData from "../../../store/selectors/user/selectUserData";

import TotalOrderReceipt from "../TotalOrderReceipt"
import EmptyListIcon from "../EmptyListIcon";
import PlaceOrderNotification from "../PlaceOrderNotification";


import {
    ORDER_OPTIONS_PAGE_URL,
} from "../../config/routing";
import {
    DATA_FETCH_PENDING,
} from "../../../store/config/actionNames";

import { storeLocation } from "../../config/store";

import useReduxCallback, { statusCodes } from "../../hooks/useReduxCallback";

import getConfirmationCode from "../../../functions/getConfirmationCode";


function Index(props) {
	const { 
        className, 
        style,
        itemTotals:{
            specials,
            rewards,
            preparation,
            fees,
            totals: {
                price,
            },
        },
        checkOut: {
            status: checkOutStatus
        },
        cart: {
            items,
            id: orderId,
        },
        user: {
            data: userData,
        },
        defaultPayment,
        removeFromCart,
        fetchPaymentMethods,
        deliveryCondition,
        address,
        history,
        pageURL,
        placeOrder,
        setItemQuantity,
        ...others
    } = props;

    const {
      type: {
        code: typeCode,
      }
    } = deliveryCondition;

    const isDelivery = typeCode === "delivery";

    const [ lastOrderId, setLastOrderId ] = useState('');
    const [ lastOrderType, setLastOrderType ] = useState('');
    const [ note, setNote ] = useState('');
    const [ showNotification, setShowNotification ] = useState(false);

    useReduxCallback(handleSubmitted, null, checkOutStatus);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    useEffect(() => {
        setLastOrderId(orderId);
        setLastOrderType(getOrderType(typeCode));
    }, []);

    function handleSubmitted(){
        setTimeout(
            () => setShowNotification(true),
            400
        );
    }

    function notChange(event){
        setNote(event.target.value)
    }

    function submit(){
        placeOrder(note);
    }



    const discounts = specials.concat(rewards);

    const orderConfirmationCode = lastOrderId && getConfirmationCode(lastOrderId);

    return (
        <>
            <PlaceOrderNotification 
                open={showNotification}
                onClose={() => setShowNotification(false)}
                firstName={userData.firstName}
                orderType={lastOrderType}
                confirmation={orderConfirmationCode}
            />
            <div 
            	className={cn(
            		'shopping-cart-l1',
            		className
            	)} 
            	style={{
                    ...style 
                }}
                {...others}
            >
                { items.length === 0 ? (
                    <>
                        <EmptyListIcon
                            icon={ShoppingBasketIcon}
                        />
                    </>
                ) : (
                    <>
                        <Header 
                            estimatedTime={preparation}
                            label={isDelivery ? 'Delivery' : 'Preparation'}
                        />
                        <Map 
                            pos={ (Boolean(address) && isDelivery) ? (
                                    {
                                        lat: address.latitude,
                                        lng: address.longitude,
                                    }
                                ) : (
                                    storeLocation
                                )
                            }
                            markerType={isDelivery ? 'person' : 'shop'}
                        />            
                        <Options 
                            delivery={deliveryCondition}
                            address={address}
                            pageURL={pageURL}
                        />
                        <ProductOptions 
                            items={items}
                            onDel={removeFromCart}
                            onInc={setItemQuantity}
                            onDec={setItemQuantity}
                            onNoteChange={notChange}
                        />
                        <TotalOrderReceipt 
                            subTotal={price}
                            discounts={discounts}
                            fees={fees}
                        />
                        <Payment 
                            card={defaultPayment}
                        />          
                    </>
                )}
                <Submit 
                    onSubmit={submit}
                    submitDisabled={!items.length}
                    loading={checkOutStatus === statusCodes.pending}
                    back={items.length === 0}
                    noPayment={!defaultPayment}
                    noAddress={isDelivery && !address}
                />
            </div>
        </>
    );
}


const getOrderType = typeCode => {
    switch(typeCode){
        case 'pickup':
            return 'pick up'
            break;
        case 'delivery':
            return 'delivery';
            break;
        case 'reserve':
            return 'dine wait free';
            break;
    }
}

export default connect(state => {
    return {
        cart: getCartSummary(state),
        itemTotals: getCartItemTotals(state),
        address: getUserDefaultAddress(state),
        deliveryCondition: getUserDeliveryCondition(state),
        user: selectUserData(state),
        checkOut: getCheckOutStatus(state),
        defaultPayment: selectDefaultPaymentMethod(state),
    }
}, {
    removeFromCart,
    placeOrder,
    fetchPaymentMethods,
    setItemQuantity
})(Index);