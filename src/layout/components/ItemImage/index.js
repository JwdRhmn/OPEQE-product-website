import React, { useMemo } from "react";
import cn from "classnames";

import useBreakpoint from "../../hooks/useBreakpoint";

export default function(props) {
    const { className, style, draggable = false, size, src, ...others } = props;

    const currentBreakpoint = useBreakpoint();

    let finalSize;
    if (size) {
        finalSize = size;
    } else {
        if (currentBreakpoint === "xs") {
            finalSize = "small";
        } else {
            finalSize = "large";
        }
    }

    const finalSrc = useMemo(
        () =>
            finalSize === "small"
                ? src
                : src.replace("/s/", '/l/'),
        []
    );

    return (
        <img
            className={cn("item-image-l1", className)}
            style={{
                ...style
            }}
            draggable={draggable}
            {...others}
            src={finalSrc}
        />
    );
}
