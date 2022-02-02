import React, { useState } from 'react';
import cn from "classnames";
import { Redirect } from "react-router-dom"

import CustomInput from '../../materialPro/components/CustomInput/CustomInput';

import Button from '../DefaultButton';
import BottomFixedContainer from "../BottomFixedContainer";

import { 
    LOG_IN_PAGE_URL,
} from "../../config/routing";

export default function({ 
        className, 
        onSubmit,
        phone,
        code,
        names,
        waiting,
        breakpoints,
        email,
        location,
}) {

    const params = new URLSearchParams(location.search);
    const type = params.get('type');


    const [ pass, setPass ] = useState('');
    const [ rePass, setRePass ] = useState('');
    const [ oldPass, setOldPass ] = useState('');    

    function onPass(event){
        setPass(event.target.value);
    }

    function onRePass(event){
        setRePass(event.target.value);
    }

    function onOldPass(event){
        setOldPass(event.target.value);
    }

    async function submit(event){ 
        switch(type){
            case 'new': {
                onSubmit({                    
                    pass,                     
                    type,
                });
                break;
            }
            case 'existing': {
                onSubmit({
                    pass: oldPass,
                    type,
                });
                break;
            }
            case 'both': {
                onSubmit({
                    newPass: pass,
                    oldPass: oldPass,
                });
                break;
            }
            default: {
                break;
            }
            
        }                      
        
    }

    if(!type){
        return <Redirect to={`/${LOG_IN_PAGE_URL()}`} />
    }

    const isBoth = type === 'both';
    const isNew = type === 'new';
    const isExisting = type === 'existing';


    const title = getTitle(type);

    return (
        <div className={cn(
            "sign-up-password-l1",
            className
        )}>
            <div className="container">
                <div className="title">
                    {title}
                </div>

                {(isBoth || isExisting) && (
                    <CustomInput                         
                        formControlProps={{
                          className: 'input'
                        }}
                        inputProps={{
                            type: 'password',
                            onChange:onOldPass,
                            value: oldPass,
                            autoComplete: 'current-password',
                            dir: 'ltr',
                        }}
                        labelText='Current password'
                    />
                )}
                {(isBoth || isNew) && (
                    <>
                        <CustomInput                         
                            formControlProps={{
                              className: 'input'
                            }}
                            inputProps={{
                                type: 'password',
                                onChange:onPass,
                                value: pass,
                                autoComplete: 'new-password',
                                dir: 'ltr',
                            }}
                            labelText='Minimum 6 characters'
                        />
                        <CustomInput                         
                            formControlProps={{
                              className: 'input'
                            }}
                            inputProps={{
                                type: 'password',
                                onChange:onRePass,
                                value: rePass,
                                autoComplete: 'new-password',
                                dir: 'ltr',
                            }}
                            labelText='Minimum 6 characters'
                        />
                    </>
                )}
                <BottomFixedContainer breakpoints={breakpoints}>
                    <Button 
                        className="button"
                        containerProps={{
                            className: "button-container"
                        }} 
                        type='submit' 
                        disabled={
                            validate(type, oldPass, pass, rePass)
                        } 
                        waiting={waiting}
                        onClick={submit}
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



                
const getTitle = type => {
    switch(type){
        case 'new': {
            return 'Create your account password';
        }
        case 'existing': {
            return 'Welcome back, Enter your password to continue';
        }
        case 'both': {
            return 'New Password?';
        }
        default: {
            break;
        }
        
    }    
}


const validate = (type, oldPass, pass, rePass) => {
    return (
        (
            (
                type === 'new' 
                || 
                type === 'both'
            ) 
            && 
            (
                pass !== rePass 
                ||
                pass.length < 6
            )
        )
        || 
        (
            (
                type === 'existing' 
                || 
                type === 'both'
            ) 
            && 
            (
                oldPass.length < 6
            )
        )
    );
}