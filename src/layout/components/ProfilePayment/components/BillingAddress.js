import React, { useState } from 'react';
import cn from "classnames";
import { Redirect } from "react-router-dom";

import DefaultTextField from "../../DefaultTextField";
import AddressAutoComplete from "../../AddressAutoComplete";
import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";
import CircularProgress from "../../CircularProgress";

import Grid from '@material-ui/core/Grid';

import getAddressComponents from "../../../../functions/getAddressComponents"

import useGoogleMaps from "../../../hooks/useGoogleMaps";


export default function(props) {
	const { 
        className, 
        style,
        onNext,
        onDone,
        loading,
        noCard,
        homePath,
        isMobile,
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 8,
        md: 8,
        lg: 8,
        xl: 6,
    }

    const [ apt, setApt ] = useState('');
    const [ postal, setPostal ] = useState('');
    const [ address, setAddress ] = useState(null);
    const [ pos, setPos ] = useState(null);

    const { loading: loadingAPI } = useGoogleMaps(); 


    function handleApt(event){
        setApt(event.target.value);
    }

    function handlePostal(event){
        setPostal(event.target.value);
    }

    function handleAddressData(data){
        const addressComponents = getAddressComponents(
            data[0].address_components
        )
        setAddress(
            addressComponents
        );
        if(addressComponents.zipCode){
            setPostal(addressComponents.zipCode);
        }

        const location = data[0].geometry.location;

        if(location){
            setPos({
                lat: location.lat(),
                lng: location.lng(),
            })
        }
    }

    function handleSubmit(){
        if(onDone){
            onDone({
                components: address,
                pos,
                apt,
                postal,
            });
        }
    }

    if(noCard){
        // return <Redirect to={homePath} />
    }

    return (
        <div 
        	className={cn(
        		'billing-address-l2',
                {"mobile": isMobile},
        		className
        	)}
        	style={{
                ...style 
            }}
            {...others}
        >
            {loadingAPI ? (
                <Grid 
                  className="full-loading"
                  container 
                  justify="center" 
                  alignItems="center" 
                >
                  <CircularProgress />
                </Grid>
            ) : (
                <>
                    <Grid
                        className="form-container"
                        container
                        item
                        {...breakpoints}
                    >
                        <AddressAutoComplete 
                            className="auto-complete"
                            placeholder="Enter billing address"
                            onData={handleAddressData}
                        />  
                        <DefaultTextField 
                            className="apt"
                            value={apt}
                            onChange={handleApt}
                            placeholder="Apt"
                        />
                        <DefaultTextField 
                            className="postal-code"
                            value={postal}
                            onChange={handlePostal}
                            placeholder="Postal Code"
                        />
                    </Grid>
                    <BottomFixedContainer className="submit">
                        <Button
                            containerProps={{
                                className: 'button'
                            }}
                            onClick={handleSubmit}
                            waiting={loading}
                        >
                            Done
                        </Button>
                    </BottomFixedContainer>
                </>
            )}
        </div>
    );
}