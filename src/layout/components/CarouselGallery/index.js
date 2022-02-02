import React, { useState, useEffect } from 'react';
import cn from "classnames";


import Grid from "@material-ui/core/Grid";
import Skeleton from '@material-ui/lab/Skeleton';

import RadioButton from "../RadioButton";

import { CONFIG_RTL } from "../../config/layout/";
import useSwipe from "../../hooks/useSwipe/";

export default function(props) {
    const { 
        className, 
        style,
        images=[],
        horizontal,
        buttonIndicator,
        buttonsProps,
        imageContainerProps,
        noIndicator,
        skeleton,
        ...others
    } = props;

    const [ current, setCurrent ] = useState(0);

    const { handleStart, handleEnd } = useSwipe({
        onDirRight: prev,
        onDirLeft: next,
        rtl: CONFIG_RTL,
    }); 

    useEffect(() => {
        setCurrent(0);
    }, [ images ]);

    function handleSelect(index){ 
        setCurrent(index);
    }

    function next(){
        if((current + 1) === images.length){
            return;
        }
        setCurrent(current + 1);
    }

    function prev(){
        if((current - 1) < 0){
            return;
        }
        setCurrent(current - 1);
    }

    if(skeleton){
        return renderSkeleton({
            horizontal: horizontal,
            noIndicator:false,
            buttonIndicator:false
        });
    }

    return (
        <Grid 
            className={cn(
                'carousel-gallery-l1',
                {"horizontal": horizontal},
                className
            )} 
            style={{
                ...style 
            }}
            container
            justify="flex-start"
            {...others}
        >
            {!noIndicator && (
                <div className="indicator">
                    {images.map(
                        (image, index) => (
                            <div 
                                key={image.url}
                                className={cn(
                                    "item", 
                                    {"selected": index === current},
                                    {"is-button": buttonIndicator}
                                )}
                                onClick={e => handleSelect(index)}
                            >
                                {(buttonIndicator) ? (
                                    <RadioButton 
                                        key={index}
                                        checked={index === current}
                                        onClick={e => handleSelect(index)}
                                        {...buttonsProps}
                                    />
                                ) : (
                                    <img src={image.url} draggable={false} alt={image.alt} />
                                )}
                            </div>
                        )
                    )}
                </div>
            )}
            <div 
                {...imageContainerProps}
                className={cn(
                    "image-container",
                    imageContainerProps && imageContainerProps.className
                )}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
                onMouseUp={handleEnd}
                onTouchEnd={handleEnd}          
            >
                <div 
                    className="scroller"
                    style={{
                        transform: `translateX(-${current * 101}%)`
                    }}
                >
                    {images.map(
                        image => (
                            <div 
                                key={image.url}
                                className="image"
                            >
                                <img src={image.url} draggable={false} alt={image.alt} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </Grid>
    );
}



function renderSkeleton({
    horizontal,
    noIndicator,
    buttonIndicator
}){

    const imageStyle = {
        minHeight: "350px"
    }

    const indicatorLooper = [null, null, null, null, null]

    return (
        <Grid 
            className={cn(
                'carousel-gallery-l1',
                {"horizontal": horizontal}
            )} 
            container
            justify="flex-start"
        >
            {!noIndicator && (
                <div className="indicator">
                    {indicatorLooper.map(
                        (item, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    "item", 
                                    "no-border",
                                    {"is-button": buttonIndicator}
                                )}
                            >
                                {(buttonIndicator) ? (
                                    <RadioButton 
                                        key={index}
                                        skeleton
                                    />
                                ) : (
                                    <Skeleton                                         
                                        variant="rect" 
                                        width="100%" 
                                        height="100%"
                                    /> 
                                )}
                            </div>
                        )
                    )}
                </div>
            )}
            <div className="image-container">
                <div className="scroller">
                    <div className="image">
                        <Skeleton 
                            style={imageStyle}
                            variant="rect" 
                            width="100%" 
                            height="100%"
                        /> 
                    </div>
                </div>
            </div>
        </Grid>
    );
}