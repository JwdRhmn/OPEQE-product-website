import React, { useState } from 'react';
import cn from "classnames";
import queryString from "query-string";


import CustomInput from '../../materialPro/components/CustomInput/CustomInput';
import Button from '../DefaultButton';
import BottomFixedContainer from "../BottomFixedContainer";


export default function(props) {
	const { 
        className, 
        style,
        onSubmit,
        breakpoints,
        location,
        loading,
        history,
        staticContext,
        ...others
    } = props;

    const queryParams = location && queryString.parse(location.search);

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName] = useState('');

    function handleFirstName(event){
        setFirstName(event.currentTarget.value)
    }

    function handleLastName(event){
        setLastName(event.currentTarget.value)
    }

    function handleSubmit(){
        if(onSubmit){
            let out;
            if(isBoth){
                out = {
                    first: firstName,
                    last: lastName,
                }
            } else {
                out = {
                    name: isFirst ? firstName : lastName,
                }
            }
            onSubmit({
                type,
                ...out,
            });
        }
    }

    const type = (queryParams && queryParams.type) ? queryParams.type : 'both';
    const isBoth = type === 'both';
    const isFirst = type === 'first';
    const isLast = type === 'last';

    return (
        <div 
        	className={cn(
        		'sign-up-name-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="title">
                Enter your {type !== 'both' && type} name
            </div>            
            { (isFirst || isBoth) && (
                <CustomInput                         
                    formControlProps={{
                      className: 'input'
                    }}
                    inputProps={{                        
                        onChange:handleFirstName,
                        value: firstName,
                        autoComplete: 'firstname',
                    }}
                    labelText='First Name'
                />
            )}
            { (isLast || isBoth) && (
                <CustomInput                         
                    formControlProps={{
                      className: 'input'
                    }}
                    inputProps={{                        
                        onChange:handleLastName,
                        value: lastName,
                        autoComplete: 'lastname',
                    }}
                    labelText='Last Name'
                />
            )}
            <BottomFixedContainer breakpoints={breakpoints}>
                <Button 
                    className="button"
                    containerProps={{
                        className: "button-container"
                    }} 
                    onClick={handleSubmit}
                    type='submit' 
                    waiting={loading}
                    disabled={
                        (
                            (isFirst || isBoth) && !firstName
                        )
                        ||
                        (
                            (isLast || isBoth) && !lastName
                        )
                    } 
                    block
                    round
                >
                    Next
                </Button>     
            </BottomFixedContainer>
        </div>
    );
}