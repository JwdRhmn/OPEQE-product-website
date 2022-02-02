import React, { useState, useEffect } from 'react';
import cn from "classnames";

import InputAdornment from "@material-ui/core/InputAdornment";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import DefaultTextField from "../DefaultTextField";

const validationRegex = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    'american-express': /^3[47][0-9]{13}$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
}

const detectionRegex = {
    visa: /^4[0-9]{0,12}(?:[0-9]{0,3})?$/,
    'american-express': /^3[47][0-9]{0,13}$/,
    mastercard: /^5[1-5][0-9]{0,14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{0,12}$/,
    discover: /^65[4-9][0-9]{0,13}$|64[4-9][0-9]{0,13}$|6011[0-9]{0,12}$|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{0,10})$/,
}



export default function(props) {
	const { 
        className, 
        style,
        initValue='',
        onChange,
        ...others
    } = props;



    const initState = {
        value: initValue,
        isValid: false,
        type: null,
        isMatch: false,
        isComplete: false,
    }
    const [ state, setState ] = useState(initState);

    useEffect(() => {
        update(state.value);
    }, [])

    function update(number){
        const newState = validate(number);
        setState( newState );
        if(onChange){
            onChange(newState);
        }
    }

    function handleChange(event){
        update( event.target.value );
    }

    return (
        <DefaultTextField  
            className={cn(
                'card-number-input-l1',
                className
            )} 
            style={{
                ...style 
            }}                    
            startAdornment={ state.type ? (
                <img src={require(
                    `../../assets/images/icons/${state.type}.png`
                )} />
            ) : (
                <CreditCardIcon />
            )}
            placeholder="Card Number"
            helperText="Please enter a valid card number"
            showHelper={state.isComplete && (!state.isValid || !state.isMatch)}
            onChange={handleChange}
            value={state.value}
            {...others}  
        />
    );
}


const validate = value => {
    let formattedValue = value.replace(/ /gi, '');
    let isComplete = false;
    let isMatch = false;
    let isValid = false;

    formattedValue = formattedValue.substr(0, 16);

    if ( /[^0-9]/.test( formattedValue[ formattedValue.length - 1 ] ) ){
        formattedValue = formattedValue.slice(0, -1);
    }

    let type = null;
    
    if(formattedValue.length < 7){
        //
    } else if (detectionRegex['visa'].test(formattedValue)){
        type = 'visa';
    } else if (detectionRegex['american-express'].test(formattedValue)){
        type = 'american-express';
    } else if (detectionRegex['mastercard'].test(formattedValue)){
        type = 'mastercard';            
    } else if (detectionRegex['discover'].test(formattedValue)){
        type = 'discover';        
    }

    if( formattedValue.length === 16 || ( type === 'american-express' && formattedValue.length === 15)){
        isComplete = true;
    }

    if(formattedValue.length >= 15 && type && validationRegex[type].test(formattedValue)){
        isMatch = true;
    }

    if(isComplete && checkLuhn(formattedValue)){
        isValid = true;
    }

    if(formattedValue.length > 4){
        if(type === 'american-express'){
            formattedValue = formattedValue.substr(0, 4) + ' '
                            + formattedValue.substr(4, 6) + ' '
                            + formattedValue.substr(10, 5);
        } else {
            formattedValue = formattedValue.match(/.{1,4}/g).join(' ');
        }
    }

    formattedValue = formattedValue.trim();

    return {
        value: formattedValue,
        isComplete,
        isMatch,
        type,
        isValid,
        cvvRange: (
            type === "american-express" ? (
                [3, 4]
            ) : (
                [3, 3]
            )
        )
    }
}



function checkLuhn(value){
    let digits = value.split('');
    let double;
    let inverseI; 
    let checkSum = 0;
    for(let i = 0; i < digits.length; i++){
        inverseI = (digits.length - 1) - i;
        double = parseInt(digits[inverseI]);
        if(i % 2 === 1){
            double = double * 2;
            if(double > 9){
                double -= 9;
            }
        }
        
        checkSum += double;
    }    

    return (checkSum % 10) === 0;
}