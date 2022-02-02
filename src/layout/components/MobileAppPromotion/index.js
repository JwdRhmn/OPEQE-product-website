import React, { useState } from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import Form from "./components/Form";

import OpeqeLogo from "../OpeqeLogo";

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
        		'mobile-app-promotion-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            item
            justify="center"
            alignItems="center"
            {...breakpoints}
            {...others}
        >
            <div className="full-image">
                <img src={require("../../assets/images/photos/full-mobile-app-promotion.jpg")} />
            </div>
            <div className="single-image before">
                <img src={require("../../assets/images/photos/ios-mobile-app-promotion.jpg")} />
            </div>
            <div className="body">
                <div>
                    <span className="small upper color-MediumGray">
                        Cross Platform
                    </span>
                </div>
                <div>
                    <span className="small">
                        native
                    </span>
                    &nbsp;
                    <span className="small upper bold">
                        Mobile Application
                    </span>
                </div>
                <div>
                    <span className="small bold color-Main">
                        Android
                    </span>
                    <span className="small bold">
                        ,
                    </span>
                    &nbsp;
                    <span className="small bold color-Secondary">
                        iOS
                    </span>
                </div>
                <OpeqeLogo 
                    className="logo" 
                    width="280" 
                />
                <div>
                    <span className="small bold upper color-Secondary">
                        Hybrid Design
                    </span>
                    &nbsp;
                    <span className="small color-MediumGray">
                        Mobile first
                    </span>
                </div>
                <div>
                    <span className="small bold upper color-Main">
                        Installable
                    </span>
                    &nbsp;
                    <span className="small upper">
                        Web Application
                    </span>
                </div>
                <div>
                    <span className="large upper color-MediumGray">
                        For Any Size Restaurant
                    </span>
                </div>
                <Form 
                    value={phone}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
            <div className="single-image after">
                <img src={require("../../assets/images/photos/android-mobile-app-promotion.jpg")} />
            </div>
        </Grid>
    );
}