import React, { useState } from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";


import OpeqeLogo from "../OpeqeLogo";
import Button from "../DefaultButton";

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        breakpoints,
        ...others
    } = props;

    const [ phone, setPhone ] = useState('');

    function handleSubmit(){

    }

    function handleChange(event){
        const phone = event.target.value;
        if(/[^0-9+]/.test(phone)){
            return;
        }
        setPhone(phone);
    }


    return (
        <Grid 
        	className={cn(
        		'gift-card-promotion-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            item
            justify="space-around"
            alignItems="center"
            {...breakpoints}
            {...others}
        >
            <div className="image">
                <img src={require("../../assets/images/photos/gift-card-promotion.jpg")} />
            </div>
            <div className="body">
                <div>
                    <span className="small bold color-MediumGray">
                        Branded
                    </span>
                    &nbsp;
                    <span className="small bold color-Secondary">
                        Gift Card
                    </span>
                </div>
                <OpeqeLogo 
                    className="logo" 
                    width="180" 
                />
                <div className="description">
                    Opeqe provides a wide range of customizable products 
                    for reward and incentive programs that can meet your 
                    restaurant’s goals. 
                    <br/>
                    Whether you are looking to drive the addition of new 
                    customers, increase the loyalty of existing ones we have a 
                    customized solution for you.
                </div>
                <div className="button">                    
                    <Button>
                        GET ONLINE QUOTE
                    </Button>              
                </div>
            </div>
        </Grid>
    );
}