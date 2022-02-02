import React, { useState } from 'react';
import cn from "classnames";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import verifyEmail from "../../../store/actions/user/verifyEmail";
import selectVerifyEmail from "../../../store/selectors/user/selectVerifyEmail";
import editNames from "../../../store/actions/user/editNames";
import selectEditNames from "../../../store/selectors/user/selectEditNames";
import editPassword from "../../../store/actions/user/editPassword";
import selectEditPassword from "../../../store/selectors/user/selectEditPassword";
import editEmail from "../../../store/actions/user/editEmail";
import selectEditEmail from "../../../store/selectors/user/selectEditEmail";
import selectUserData from "../../../store/selectors/user/selectUserData";

import AnimatedSwitch from "../AnimatedSwitch";

import Home from "./components/Home";

import SignUpPhone from "../SignUpPhone";
import SignUpConfirmationCode from "../SignUpConfirmationCode";
import SignUpPassword from "../SignUpPassword"
import SignUpEmail from "../SignUpEmail";
import SignUpName from "../SignUpName";

import useReduxCallback from "../../hooks/useReduxCallback";

function Index(props) {
	const { 
        className, 
        style,
        basePath,
        editNames,
        names: {
          status: namesStatus,
        },
        editPassword,
        password: {
          status: passwordStatus,
          data: passwordData,
        },
        editEmail,
        email: {
          status: emailStatus,
          data: emailData,
        },
        verifyEmail,
        emailVerification: {
          status: emailVerificationStatus,
          data: emailVerificationData,
        },
        user: {
            data: user,
        },
        breakpoints,
        history,
        location,
        staticContext,
        ...others
    } = props;


    const [ email, setEmail ] = useState(null);

    useReduxCallback(namesDone, null, namesStatus);
    function namesSubmitted(data){
        editNames({
            newName: data.name,
            nameType: data.type,
        });
    }
    function namesDone(){
        history.replace(basePath);
    }

    useReduxCallback(passDone, null, passwordStatus);
    function passSubmitted(data){
        editPassword({
            oldPass: data.oldPass,
            newPass: data.newPass,
        });
    }
    function passDone(){
        if(passwordData && passwordData.success) {
            history.replace(basePath);
        }
    }

    useReduxCallback(emailVerificationDone, null, emailVerificationStatus);
    function emailSubmitted(data){
        verifyEmail({
            email: data,
        });
        setEmail({data});
    }
    function emailVerificationDone(){
        if(emailVerificationData && emailVerificationData.success) {
            history.push(`${basePath}/verification`);
        }
    }

    useReduxCallback(emailDone, null, emailStatus);
    function emailCodeSubmitted(digits){
        editEmail({
            code: digits.join(''),
            email: email,
        });
    }
    function emailDone(){
        if(emailData && emailData.success) {
            history.replace(basePath);
        }
    }

    return (
        <div 
        	className={cn(
        		'profile-settings-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >            
            <div className="container">
                <AnimatedSwitch>                                                                                
                    <Route 
                        path={`${basePath}`}
                        exact                        
                        render={routerProps => (
                           <Home 
                                basePath={basePath}
                                firstname={user.firstName}
                                lastname={user.lastName}
                                phone={user.mobileNumber}                                
                                email={user.email}
                            /> 
                        )}
                    />                        
                    <Route 
                        path={`${basePath}/names`}
                        render={ 
                            routerProps => (
                                <SignUpName 
                                    onSubmit={namesSubmitted} 
                                    loading={namesStatus === "pending"}
                                    {...routerProps} 
                                    breakpoints={breakpoints}
                                />
                            )
                        }
                    />
                    <Route 
                        path={`${basePath}/email`}
                        render={ 
                            routerProps => (
                                <SignUpEmail 
                                    onSubmit={emailSubmitted}
                                    loading={emailVerificationStatus === "pending"}
                                    breakpoints={breakpoints}
                                />
                            )
                        }
                    />
                    <Route 
                        path={`${basePath}/verification`}
                        render={ 
                            routerProps => (
                                <SignUpConfirmationCode 
                                    onSubmit={emailCodeSubmitted} 
                                    loading={emailStatus === "pending"}
                                    target={email} 
                                    targetName="email address"
                                    deadline={60}
                                    {...routerProps}
                                    breakpoints={breakpoints}
                                />
                            )
                        }
                    />
                    <Route 
                        path={`${basePath}/pass`}
                        render={ 
                            routerProps => (
                                <SignUpPassword                                     
                                    onSubmit={passSubmitted}                             
                                    waiting={passwordStatus === 'pending'}
                                    {...routerProps}
                                    breakpoints={breakpoints}
                                />
                            )
                        }
                    />
                    <Redirect to={`${basePath}`} /> 
                </AnimatedSwitch>
            </div>
        </div>
    );
}


export default connect( state => ({
    names: selectEditNames(state),
    password: selectEditPassword(state),
    user: selectUserData(state),
    email: selectEditEmail(state),
    emailVerification: selectVerifyEmail(state)
}),{
    editNames,
    editPassword,
    editEmail,
    verifyEmail
})(Index);



