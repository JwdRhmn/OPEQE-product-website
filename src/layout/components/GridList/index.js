import React, { useEffect, memo } from 'react';
import cn from "classnames";

import useBreakpoint from "../../hooks/useBreakpoint/";

import Grid from "@material-ui/core/Grid";

import isMobile from "../../../functions/isMobile";

import compareOwnProps from "../../functions/compareOwnProps";

function Index(props) {
	const { 
        frameSize=3,
        children, 
        className, 
        style,
        onFrameCountChange, 
        listContainerProps,     
        skeleton,
    } = props; 

    const currentBreakpoint = useBreakpoint();

    useEffect( () => {
        let count;
        if(children && children.length){
            count = children.length;
        } else {
            count = 1;
        }

        if(onFrameCountChange){            
            onFrameCountChange(
                getFrameCount(currentBreakpoint, frameSize, count)
            );
        }
    }, [currentBreakpoint, children && children.length]);


    return (
        <div 
            className={cn(
                "grid-list-l1",
                className,
            )}
            style={{
                ...style,
            }}          
        >
       		<div 
                {...listContainerProps}
                className={cn(
                    "list-container",
                    listContainerProps && listContainerProps.className
                )}
            >
                 <Grid 
                    className={cn(
                        "list-scroller",
                        `take-${frameSize}`,
                    )}
                    container
                    alignItems="stretch"
                >                                   
                    {children}
                </Grid>   
            </div>            
        </div>
    );
}



function getFrameCount(breakpoint, frameSize, itemCount){
    let counts = {
        xs: 1,
        sm: 1,
        md: 1,
        lg: frameSize,
        xl: frameSize,
    }

    if(frameSize === 5 || frameSize === 6) {
        counts = {
            ...counts,
            xs: 2,
            sm: 4,
            md: 5,
        }
    }
    if(frameSize === 4) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 3,
        }
    }
    if(frameSize === 3) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 3,
        }
    }
    if(frameSize === 2) {
        counts = {
            ...counts,
            xs: 1,
            sm: 2,
            md: 2,
        }
    }

    return Math.ceil(itemCount / counts[breakpoint]) - 1;

}


export default memo(Index, compareOwnProps(false, ["on"]))