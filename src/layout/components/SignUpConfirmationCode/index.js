import React, { useState, useRef } from "react";
import cn from "classnames";

import Button from "../DefaultButton";
import BottomFixedContainer from "../BottomFixedContainer";



import CodeInput from "../CodeInput";
import useTimer from "../../hooks/useTimer/";

export default function({
    target,
    deadline,
    className,
    loading,
    onResend,
    targetName,
    breakpoints,
    onSubmit
}) {
    const initialState = {
        digits: ["", "", "", ""],
        tooLong: false,
        resend: false
    };
    const [state, setState] = useState(initialState);

    const { seconds } = useTimer({
        from: deadline,
        onChange: timerChange
    });

    const codeInputRef = useRef(null);

    function timerChange(num) {
        if (num === 0) {
            setState({
                ...state,
                resend: true
            });
            return;
        }

        if (num < 10) {
            setState({
                ...state,
                tooLong: true
            });
        }
    }

    function onChange(digits) {
        setState({
            ...state,
            digits: digits
        });
    }

    function check(event) {
        if (onSubmit) {
            onSubmit(state.digits);
        }
    }

    function validate() {
        return (
            state.digits.reduce(
                (total, digit) => (total += digit !== "" && 1),
                0
            ) !== 4
        );
    }

    return (
        <div className={cn("sign-up-confirmation-code-l1", className)}>
            <div className="container">
                <div className="title">
                    Enter the 4-digit code sent to you at {target}
                </div>
                <div
                    className="sub-title"
                    style={{ opacity: state.tooLong ? 1 : 0 }}
                >
                    Did you enter the correct {targetName}?
                </div>
                <CodeInput
                    className="input"
                    fieldClassName="digit"
                    onChange={onChange}
                    ref={codeInputRef}
                />
                <BottomFixedContainer breakpoints={breakpoints}>
                    <Button
                        className="button"
                        containerProps={{
                            className: "button-container"
                        }}
                        waiting={loading}
                        type="submit"
                        round
                        block
                        disabled={validate()}
                        onClick={check}
                    >
                        Next
                    </Button>
                </BottomFixedContainer>
                <div className="timer">
                    {state.resend ? (
                        <span className="resend" onClick={onResend}>
                            I didn't recieve the confirmation code
                        </span>
                    ) : (
                        <>
                            Resend code in : <span>{seconds}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
