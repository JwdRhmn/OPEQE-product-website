import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import { ReactComponent as FooterSVG } from "../../../assets/images/photos/footerTop.svg";

export default function(props) {
    const { breakpoints, className, style, ...others } = props;

    return (
        <div
            className={cn("image-l2", className)}
            style={{
                ...style
            }}
            {...others}
        >
            <Grid
                className="image-container"
                container
                item
                alignItems="center"
                justify="center"
                {...breakpoints}
                xs={12}
                sm={8}
            >
                <FooterSVG />
            </Grid>
        </div>
    );
}
