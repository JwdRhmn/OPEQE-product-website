import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import AnimatedSwitch from "../AnimatedSwitch";

import checkEmail from "../../../store/actions/demo/checkEmail";
import setAccountBan from "../../../store/actions/demo/setBan";
import selectCheckEmail from "../../../store/selectors/demo/selectCheckEmail";
import userSignUp from "../../../store/actions/user/userSignUp";
import userLogIn from "../../../store/actions/user/userLogIn";
import selectUserData from "../../../store/selectors/user/selectUserData";
import checkDuplicateCode from "../../../api/user/checkDuplicateCode";

import useAsync from "../../hooks/useAsync/";

import { HOME_PAGE_URL, LOG_IN_PAGE_URL, BANNED_PAGE_URL } from "../../config/routing";
import { storeBanCode, userBanCode } from "../../config/app";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import SignUpPhone from "../SignUpPhone";
import SignUpPassword from "../SignUpPassword";
import SignUpConfirmationCode from "../SignUpConfirmationCode";
import SignUpEmail from "../SignUpEmail";
import SignUpName from "../SignUpName";
import NotDemoMailNotification from "../NotDemoMailNotification";

import useReduxCallback, { statusCodes } from "../../hooks/useReduxCallback";

import isDemo from "../../../functions/isDemo";

function Index(props) {
    const {
        setAuth,
        history,
        location,
        match,
        userSignUp,
        userLogIn,
        user: {
            data: userData,
            error: userError,
            status: userStatus
        },
        checkEmail,
        emailCheck: { status: emailCheckStatus },
        setAccountBan,
        ...others
    } = props;

    const breakpoints = {
        xs: 11,
        sm: 8,
        md: 6,
        lg: 5,
        xl: 5
    };

    const { handle: asyncHandle, state: asyncState } = useAsync();

    const [phone, setPhone] = useState("");
    const [code, setCode] = useState(null);
    const [email, setEmail] = useState(null);
    const [names, setNames] = useState(null);
    const [redirectTo, setRedirectTo] = useState(null);

    const [showNotDemo, setShowNotDemo] = useState(false);
    useReduxCallback(emailCheckDone, emailCheckFailed, emailCheckStatus);
    useReduxCallback(null, submitRejected, userStatus);


    useEffect(() => {
        if (location.state && location.state.from) {
            setRedirectTo(location.state.from);
        }
    }, [location.state]);


    function submitRejected(){
        if(userError === 205 || userError === 206){
            return history.replace(`/${BANNED_PAGE_URL()}`);
        }
    }

    function codeSent(status, value) {
        switch(status){
            case 200:
                history.push(`/${LOG_IN_PAGE_URL()}/pass?type=existing`);
                break;
            case 202:
                history.push(`/${LOG_IN_PAGE_URL()}/code`);
                break;
            case storeBanCode:
                setAccountBan('store', true);
                break;   
            case userBanCode:
                setAccountBan('user', true);
                break;  
        }
        setPhone(value);
    }

    function codeSubmitted(digits) {
        asyncHandle(
            checkDuplicateCode({
                phone: phoneEscaped,
                code: digits.join("")
            }),
            data => {
                setCode(digits.join(""));
                history.push(`/${LOG_IN_PAGE_URL()}/email`);
            },
            error => {
                console.error(error);
            }
        );
    }

    function emailSubmitted(email) {
        setEmail(email);
        if (isDemo) {
            checkEmail({
                email
            });
        } else {
            emailCheckDone();
        }
    }
    function emailCheckDone() {
        history.push(`/${LOG_IN_PAGE_URL()}/names`);
    }
    function emailCheckFailed() {
        setShowNotDemo(true);
    }

    function namesSubmitted(namse) {
        setNames(namse);
        history.push(`/${LOG_IN_PAGE_URL()}/pass?type=new`);
    }

    function handleSubmit(data) {
        if (data.type === "new") {
            userSignUp({
                phone: phoneEscaped,
                pass: data.pass,
                code,
                email,
                names
            });
        } else {
            userLogIn({
                phone: phoneEscaped,
                pass: data.pass
            });
        }
    }

    

    if (userStatus === statusCodes.fulfilled) {
        if (redirectTo) {
            return <Redirect to={redirectTo} />;
        }
        return <Redirect to={`/${HOME_PAGE_URL()}`} />;
    }

    const phoneEscaped = phone.replace(/[^0-9]/gi, "");

    return (
        <>
            <NotDemoMailNotification
                open={showNotDemo}
                onClose={() => setShowNotDemo(false)}
            />
            <Grid container justify="center" className="sign-up-page-l1">
                <Grid item className="screen" {...breakpoints}>
                    <AnimatedSwitch>
                        <Route
                            path={`/${LOG_IN_PAGE_URL()}`}
                            exact
                            render={routerProps => (
                                <SignUpPhone
                                    onCodeSent={codeSent}
                                    breakpoints={breakpoints}
                                    {...routerProps}
                                />
                            )}
                        />
                        <Route
                            path={`/${LOG_IN_PAGE_URL()}/code`}
                            render={routerProps => (
                                <SignUpConfirmationCode
                                    onSubmit={codeSubmitted}
                                    loading={asyncState.waiting}
                                    target={phone}
                                    targetName="mobile number"
                                    deadline={60}
                                    breakpoints={breakpoints}
                                    {...routerProps}
                                />
                            )}
                        />
                        <Route
                            path={`/${LOG_IN_PAGE_URL()}/email`}
                            render={routerProps => (
                                <SignUpEmail
                                    loading={emailCheckStatus === "pending"}
                                    onSubmit={emailSubmitted}
                                    breakpoints={breakpoints}
                                    {...routerProps}
                                />
                            )}
                        />
                        <Route
                            path={`/${LOG_IN_PAGE_URL()}/names`}
                            render={routerProps => (
                                <SignUpName
                                    onSubmit={namesSubmitted}
                                    breakpoints={breakpoints}
                                    {...routerProps}
                                />
                            )}
                        />
                        <Route
                            path={`/${LOG_IN_PAGE_URL()}/pass`}
                            render={routerProps => (
                                <SignUpPassword
                                    onSubmit={handleSubmit}
                                    waiting={userStatus === statusCodes.pending}
                                    breakpoints={breakpoints}
                                    {...routerProps}
                                />
                            )}
                        />
                        <Redirect to={`/${LOG_IN_PAGE_URL()}`} />
                    </AnimatedSwitch>
                </Grid>
            </Grid>
        </>
    );
}

export default connect(
    state => {
        return {
            user: selectUserData(state),
            emailCheck: selectCheckEmail(state)
        };
    },
    {
        userLogIn,
        userSignUp,
        checkEmail,
        setAccountBan
    }
)(Index);
