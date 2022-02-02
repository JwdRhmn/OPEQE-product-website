import React, { useState } from 'react';
import cn from "classnames";


import TextField from "@material-ui/core/TextField";

import Button from '../DefaultButton';
import BottomFixedContainer from "../BottomFixedContainer";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function(props) {
    const { 
        className, 
        onSubmit, 
        loading,
        breakpoints
    } = props;

    const initialState = {
        email: '',
    };
    const [ state, setState ] = useState(initialState);

    function validate(){
        return !emailRegex.test(state.email);
    }

    function onEmail(event){
        setState({
            ...state,
            email: event.target.value.toLowerCase(),
        })
    }

    function submit(event){
        event.preventDefault();
        const { email } = state;

        onSubmit(email);
    }

    return (
        <div className={cn(
            "sign-up-email-l1",
            className
        )}>     
            <div className="container">
                <div className="title">
                    What's your email address?
                </div>
                <TextField              
                    className="input"           
                    value={state.email}
                    onChange={onEmail}
                    type='email'
                    placeholder='name@domain.com'
                    label='Your email'
                    dir={'ltr'}
                />
                <div className='note' style={{
                    opacity: !validate() || 1,
                }}>
                   Please enter a valid email adderss
                </div> 
                <BottomFixedContainer breakpoints={breakpoints}>
                    <Button 
                        className='button' 
                        containerProps={{
                            className: "button-container"
                        }}
                        type='submit' 
                        disabled={validate()}
                        onClick={submit} 
                        waiting={loading}
                        block
                        round
                    >
                        Next
                    </Button> 
                </BottomFixedContainer>
            </div>
        </div>
    );
}