import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";
import TodayIcon from "@material-ui/icons/Today";
import HourglassFullIcon from "@material-ui/icons/HourglassFullTwoTone";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import PeopleIcon from "@material-ui/icons/People";

import Button from "../../DefaultButton";

export default function(props) {
    const {
        className,
        style,
        day,
        weekDay,
        monthName,
        time,
        id,
        count,
        waitList,
        onCancel,
        hideDine,
        code,
        loading,
        onDine,
        ...others
    } = props;

    function handleCancel(event) {
        if (onCancel) {
            onCancel(id);
        }
    }

    function handleDine() {
        if (onDine) {
            onDine({
                id,
                count,
                isWaitlist: waitList
            });
        }
    }

    return (
        <Grid
            className={cn("reserve-list-item-l2", className)}
            style={{
                ...style
            }}
            container
            justify="space-between"
            alignItems="center"
            {...others}
        >
            <div className="body">
                <div className="day">
                    <div className="month">{monthName}</div>
                    <div className="month-day">{day}</div>
                    <div className="week-day">{weekDay}</div>
                </div>
                <Grid className="details" container alignItems="flex-start">
                    <div className="item code">
                        <TodayIcon className="icon" />
                        <span className="text"># {code}</span>
                    </div>
                    <div className="item count">
                        {waitList ? (
                            <HourglassFullIcon className="icon" />
                        ) : (
                            <PeopleIcon className="icon" />
                        )}
                        <span className="text">Table for {count}</span>
                        {waitList && (
                            <>
                                <span className="divider" />
                                <span className="red">waitList</span>
                            </>
                        )}
                    </div>
                    <div className="item time">
                        <AlarmOnIcon className="icon" />
                        <span className="text">{time}</span>
                    </div>
                </Grid>
            </div>
            <Grid className="buttons" container justify="space-around">
                <Button
                    className="gray"
                    containerProps={{
                        className: "button-container"
                    }}
                    theme="gray"
                    size="small"
                    style={{
                        display: hideDine && "none"
                    }}
                    onClick={handleDine}
                >
                    Dine Wait Free
                </Button>
                <Button
                    className="light"
                    containerProps={{
                        className: "button-container"
                    }}
                    onClick={handleCancel}
                    theme="light"
                    size="small"
                    waiting={loading}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}
