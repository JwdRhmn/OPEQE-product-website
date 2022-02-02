import React from 'react';
import cn from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import clearCart from "../../../store/actions/cart/clearCart";

import Button from "../DefaultButton";
import ItemImage from "../ItemImage";

import {
    SHOPPING_CART_PAGE_URL
} from "../../config/routing";

import StyledNotification from "../StyledNotification";


function Index(props) {
	const { 
        className, 
        style,
        refrenceCode,
        onClose,
        clearCart,
        img,
        ...others
    } = props;

    function handleClearCart(){
        clearCart();
        if(onClose){
            onClose();
        }
    }

    return (
        <StyledNotification 
            className={cn(
                "continue-order-notification-l1",
                className,
            )}   
        	style={{
                ...style 
            }}
            onClose={onClose}
            {...others}
        >
            <div className="img-container">                    
                <ItemImage src={img} />
            </div>
            <div className="medium">
                Continue with your previous items?
                <br/>
                <span className="gray">
                    You still have an item in your cart
                </span>
            </div>
            <Grid
                container
                justify="space-between"
                style={{
                    marginTop: '15px',
                }}
            >
                <Button
                    width="100%"   
                    component={Link}  
                    onClick={onClose}           
                    to={`/${SHOPPING_CART_PAGE_URL()}`}
                >
                    Continue
                </Button>
                <Button
                    theme="light-gray"  
                    width="100%" 
                    onClick={handleClearCart}            
                >
                    Clear Cart
                </Button>
            </Grid>
        </StyledNotification>
    );
}



export default connect(null,{
    clearCart,
})(Index);