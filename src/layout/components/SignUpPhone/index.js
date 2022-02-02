import React, { useState } from "react";
import cn from "classnames";

import PhoneInput from "../PhoneInput";
import Button from "../DefaultButton";
import BottomFixedContainer from "../BottomFixedContainer";

import checkIfNewUser from "../../../api/user/checkIfNewUser";
import useAsync from "../../hooks/useAsync/";

export default function(props) {
    const { onCodeSent, className, breakpoints } = props;

    const initialState = {
        value: ""
    };
    const [state, setState] = useState(initialState);

    function setValue(value) {
        setState({
            ...state,
            value: value
        });
    }

    const { handle: asyncHandle, state: asyncState } = useAsync();

    function check() {
        const phone = state.value.replace(/[^0-9]/gi, "");

        asyncHandle(
            checkIfNewUser({
                phone
            }),
            data => {
                onCodeSent(data.status, state.value);
            },
            error => {
                console.error(error);
            }
        );
    }
    
    return (
        <div className={cn("sign-up-phone-l1", className)}>
            <div className="container">
                <div className="title">
                    Please Enter Your Phone Number To Continue
                </div>

                    <PhoneInput
                        label="Your Phone Number"
                        value={state.value}
                        onChange={setValue}
                    />
                    <BottomFixedContainer breakpoints={breakpoints}>
                        <Button
                            className="button"
                            containerProps={{
                                className: "button-container"
                            }}
                            onClick={check}
                            waiting={asyncState.waiting}
                            type="submit"
                            block
                        >
                            Next
                        </Button>
                    </BottomFixedContainer>
            </div>
        </div>
    );
}
