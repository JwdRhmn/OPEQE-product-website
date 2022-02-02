import React, { useState } from "react";
import cn from "classnames";

import isMobile from "../../../../functions/isMobile";

import Button from "../../DefaultButton";
import NumberSelect from "../../NumberSelect";
import BottomFixedContainer from "../../BottomFixedContainer";

import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Grid from '@material-ui/core/Grid';

export default function(props) {
    const {
        className,
        style,
        loading,
        onSubmit,
        disabled,
        max,
        current,
        breakpoints,
        ...others
    } = props;

    const [count, setCount] = useState(2);
    function increment() {
        if (max && count === max) {
            return;
        }
        setCount(count + 1);
    }

    function decrement() {
        if (count === 1) {
            return;
        }
        setCount(count - 1);
    }

    function handleSubmit() {
        onSubmit(count);
    }

    return (
        <BottomFixedContainer
            className={cn(
                "schedule-buttons-l2",
                { mobile: isMobile },
                className
            )}
            style={{
                ...style
            }}         
            breakpoints={breakpoints}
            {...others}
        >
            {isMobile && <br />}
            {(!isMobile || current === "time") && (
                <div className="number-select-container">
                    {isMobile && (
                        <GroupAddIcon className="icon" />
                    )}
                    <NumberSelect
                        className="number-select"
                        onDecrement={decrement}
                        onIncrement={increment}
                        value={count}
                        decDisabled={count === 1}
                        incDisabled={count === max}
                    />
                </div>

            )}
            <Button
                containerProps={{
                    className: "submit"
                }}
                disabled={disabled}
                onClick={handleSubmit}
                waiting={loading}
                theme="gray"
            >
                Next
            </Button>
        </BottomFixedContainer>
    );
}
