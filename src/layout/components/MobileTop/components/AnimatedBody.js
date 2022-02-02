import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

export default props => {
    const {
        middle={},
        end={},
        noEnd,
        className,
        style,
        child,
        ...others
    } = props;
    return (
        <Grid
            className={cn(
                "animated-body-l2",
                className
            )}
            style={{
                ...style
            }}
            container
            justify="space-between"
            alignItems="center"
            {...others}
        >
            {child ? (
                child
            ) : (
                <>
                    <span
                        className={cn("middle", {
                            clickable: middle.onClick
                        })}
                        onClick={middle.onClick}
                    >
                        <div className="main">{middle.main}</div>
                        <div className="sub">{middle.sub}</div>
                    </span>
                    {!noEnd && (
                        <span
                            className={cn("end", {
                                clickable: end && end.onClick
                            })}
                            onClick={end && end.onClick}
                        >
                            {end && end.main}
                        </span>
                    )}
                </>
            )}
        </Grid>
    )
}