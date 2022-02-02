import React, { useState, useEffect, memo } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import getEvents from "../../../store/actions/calendar/getEvents";
import selectEvents from "../../../store/selectors/calendar/selectEvents";

import DateTimePicker from "../DateTimePicker";
import AnimatedSwitch from "../AnimatedSwitch";

import isMobile from "../../../functions/isMobile";
import getDate from "../../../functions/formattedDate";

import useRouter from "../../hooks/useRouter";

function Index(props) {
    const {
        className,
        style,
        onDone,
        events: { list: eventList },
        getEvents,
        startTime = "7:00:00",
        endTime = "23:30:00",
        buttons: Buttons,
        buttonsProps,
        noTimeLabel,
        loading,
        basePath,        
        dateTitle,
        timeTitle,
        ...others
    } = props;

    const {
        location,
        history,
        matchPath,
    } = useRouter();

    useEffect(() => {
        getEvents();
    }, []);

    const [date, setDate] = useState(
        () => correctDate(new Date(), startTime, endTime)
    );
    const [time, setTime] = useState(null);    

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(correctDate(date, startTime, endTime));
            
        }, 15 * 60000);
        return () => {
            clearInterval(timer);
        };
    }, [date]);

    

    function handleDateChange(newDate) {
        setDate(correctDate(newDate, startTime, endTime));
        
    }

    function handleTimeChange(newTime) {
        setTime(newTime);
    }

    function handleSubmit(dataFromButtons) {
        if (isMobile && current === "date") {
            handleNext();
        } else {
            handleDone(dataFromButtons);
        }
    }

    function handleNext() {
        history.push(timePath);
    }

    function handleDone(dataFromButtons) {
        if (!finalTime || isPast(date, finalTime)) {
            return;
        }

        const event = checkIfContainsDate(eventList, date);

        onDone(
            {
                ...getDate(date),
                hour: finalTime.hour12,
                minute: finalTime.minute,
                meridiem: finalTime.meridiem,
                event
            },
            dataFromButtons
        );
    }

    function renderDateTime(only) {
        return (
            <>
                <DateTimePicker
                    timePickerProps={{
                        from: {
                            hour: date.getHours(),
                            minute: date.getMinutes()
                        },
                        to: {
                            hour: parseInt(endTimeSplitted[0]),
                            minute: parseInt(endTimeSplitted[1])
                        },
                        interval: 30
                    }}
                    onTime={handleTimeChange}
                    onDate={handleDateChange}
                    date={date}
                    time={finalTime}
                    timeTitle={timeTitle}
                    dateTitle={dateTitle}
                    events={eventList}
                    noTimeLabel={noTimeLabel}
                    only={only}
                />
                {Buttons && (
                    <Buttons
                        loading={loading}
                        onSubmit={handleSubmit}
                        current={current}
                        {...buttonsProps}
                    />
                )}
            </>
        );
    }


    const timePath = `${basePath}/time`;
    const current = isMobile ? (
        matchPath(location.pathname, {path: timePath}) ? (
            "time"
        ) : (
            "date"
        )
    ) : (
        'both'
    )
    const endTimeSplitted = endTime.split(":");
    const finalTime = time || getTimeForTimePicker(date);

    return (
        <div
            className={cn("schedule-l1", className)}
            style={{
                ...style
            }}
            {...others}
        >
            {isMobile ? (
                <AnimatedSwitch>
                    <Route
                        path={`${basePath}`}
                        exact
                        render={routerProps => {                            
                            return renderDateTime("date")
                        }}
                    />
                    <Route
                        path={`${basePath}/time`}
                        render={routerProps => {                            
                            return renderDateTime("time")
                        }}
                    />
                    <Redirect to={`${basePath}`} />
                </AnimatedSwitch>
            ) : (
                renderDateTime("both")
            )}            
        </div>
    );
}

const isPast = (date, time) => {
    const now = new Date();
    const hour = now.getHours();

    return (
        now.getMonth() === date.getMonth() &&
        now.getDate() === date.getDate() &&
        now.getYear() === date.getYear() &&
        (time.hour < hour ||
            (time.hour === hour && time.minute < now.getMinutes()))
    );
};

const correctDate = (date, startTime, endTime) => {
    const now = new Date();
    const newDate = new Date(date);

    const startTimeSplitted = startTime.split(":");

    if (checkTimeRange(newDate, now)) {
        newDate.setHours(startTimeSplitted[0]);
        newDate.setMinutes(startTimeSplitted[1]);
    } else {
        let minute = now.getMinutes();
        let hour = now.getHours();

        if ((minute > 30 || minute === 0) && hour < 23) {
            minute = 0;
            hour++;
        } else {
            minute = 30;
        }
        newDate.setHours(hour);
        newDate.setMinutes(minute);
    }

    return newDate;
};

const checkTimeRange = (newDate, now) => {
    return (
        newDate.getMonth() !== now.getMonth() ||
        newDate.getDate() !== now.getDate()
    );
};

const checkIfContainsDate = (array, date) => {
    for (let i = 0; i < array.length; i++) {
        if (
            array[i].day === date.getDate() &&
            array[i].month === date.getMonth() + 1 &&
            array[i].year === date.getFullYear()
        ) {
            return array[i];
        }
    }

    return null;
};


const getTimeForTimePicker = date => {
    const out = getDate(date);
    out.id = `${parseInt(out.hour)}:${parseInt(out.minute)}`;
    return out;
}

const Memoized = memo(Index, (prev, next) => {
    return (
        prev.events === next.events &&
        prev.buttonsProps === next.buttonsProps &&
        prev.loading === next.loading
    );
});

export default connect(
    state => {
        return {
            events: selectEvents(state)
        };
    },
    {
        getEvents
    }
)(Memoized);
