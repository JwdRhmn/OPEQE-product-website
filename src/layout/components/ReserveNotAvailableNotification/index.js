import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Button from "../DefaultButton";

import { RESERVATION_DETAILS_PAGE_URL } from "../../config/routing";

import StyledNotification from "../StyledNotification";

export default function(props) {
    const { className, style, onClose, time, date, ...others } = props;

    return (
        <StyledNotification
            className={cn("reserve-not-available-notification-l1", className)}
            style={{
                ...style
            }}
            onClose={onClose}
            {...others}
        >
            <div className="body">
                <div className="title">Not Available</div>
                <div className="sub-title">
                    At the moment, there's no online availability within an hour
                    of
                </div>
                <div className="text">
                    {date}
                    <br />
                    {time}
                </div>
                <div className="sub-title">Have another time in mind ?</div>
            </div>
            <Grid
                container
                justify="space-between"
                style={{
                    marginTop: "15px"
                }}
            >
                <Button
                    containerProps={{
                        className: "button-container"
                    }}
                    onClick={onClose}
                >
                    Choose Another Time
                </Button>
                <Button
                    containerProps={{
                        className: "button-container"
                    }}
                    theme="light-gray"
                    component={Link}
                    onClick={onClose}
                    to={`/${RESERVATION_DETAILS_PAGE_URL({ isWait: true })}`}
                >
                    Wait To Be Seated
                </Button>
            </Grid>
        </StyledNotification>
    );
}
    