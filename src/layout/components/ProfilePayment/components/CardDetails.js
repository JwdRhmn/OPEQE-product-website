import React, { useState } from 'react';
import cn from "classnames";

import CardNumberInput from "../../CardNumberInput";
import PlainDateInput from "../../PlainDateInput";
import DefaultTextField from "../../DefaultTextField";
import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";

export default function(props) {
	const { 
        className, 
        style,
        onNext,
        isMobile,
        ...others
    } = props;

    const [ number, setNumber] = useState('');
    const [ date, setDate] = useState('');
    const [ CVV, setCVV] = useState('');

    function handleCVV(event){
        const value = event.target.value.replace(/[^0-9]/, '');
        if(value.length > 4){
            return;
        }
        setCVV(value);
    }

    function handleSubmit(){
        if(onNext){
            onNext({
                number: number.value,
                date: date.value.replace(/ /g, ''),
                cvv: CVV,
                type: number.type,
            });
        }
    }

    return (
        <div 
        	className={cn(
        		'card-details-l2',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <CardNumberInput 
                className="number"
                onChange={setNumber}
            />
            <br />
            <PlainDateInput 
                className="date"
                onChange={setDate}
            />
            <DefaultTextField 
                className="cvv"
                value={CVV}
                onChange={handleCVV}
                placeholder="CVV"
            />
            <BottomFixedContainer className="submit">
                <Button
                    disabled={
                        !number.isValid
                        ||
                        !date.isValid
                        ||
                        !validateCVV(CVV, number.cvvRange)
                    }
                    onClick={handleSubmit}
                >
                    Next
                </Button>
            </BottomFixedContainer>
        </div>
    );
}


const validateCVV = (cvv, range) =>{
    const length = cvv.length;
    return (
        length >= range[0]
        &&
        length <= range[1]
    )
}