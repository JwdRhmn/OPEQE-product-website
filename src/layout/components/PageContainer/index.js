import React from 'react';
import cn from "classnames";

import isMobile from "../../../functions/isMobile";

import ScrollableContainer from "../ScrollableContainer";

export default function(props) {
	const { 
        className, 
        style,
        location,
        scrollableProps,
        match,
        history,
        staticContext,
        children,
        ...others
    } = props;

    const Container = true ? 'div' : ScrollableContainer;

    const propsIfScrollable = Container !== 'div' ? (
        {
            scrollableProps: {
                ...scrollableProps,
                className: cn(
                    "scrollable-container",
                    scrollableProps && scrollableProps.className
                ),
            }
        } 
    ) : (
        {}
    )

    return (
        <Container 
        	className={cn(
        		'page-container-l1',
                {'mobile': isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...propsIfScrollable}
            {...others}
        >
            <div className="placeholder"/>
            {children}
        </Container>
    );
}