import React from 'react';
import cn from "classnames";

import { CONFIG_RTL } from "../../config/layout/";

export default function ({
    stepCount=1, 
    currentStep=1, 
    style, 
    skeleton,
    className,
    freeScroll,
    scrollIndex,
    ...others
}) {
    
    let scroll;
    if(freeScroll){
        if(scrollIndex > 100){
            scroll = `100%`
        } else if(scrollIndex < 0){
            scroll = `0`
        } else{
            scroll = `${scrollIndex}%`
        }
    } else {
        scroll = ((currentStep <= stepCount) ? 
            (
                `${Math.abs(parseInt(currentStep * 100 / stepCount))}%`
            )
            :
            '100%'
        );
    }

    return (
        <div 
            className={cn(
                "horizontal-list-scroll-bar-l1",
                {"scroll": freeScroll},
                className,
            )}
            style={{
                ...style,
            }}
            {...others}
        >
        	<div className="bar">
                 {!skeleton && (
                     <div 
                        className="cursor" 
                        style={
                            CONFIG_RTL ? (
                                {
                                    right: scroll,
                                }
                            ) : (
                                {
                                    left: scroll,
                                }
                            )
                        }
                    />   
                )}
            </div>
        </div>
    );
}

