import React, { useState, useEffect } from 'react';
import cn from "classnames";



import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


import { DEFAULT_THEME_COLORS } from "../../config/layout";

const useStyles = makeStyles({
  colorPrimary: props => ({
    color: props.color,
  }),
  circle: props => ({
    transition: props.noAnimation ? (
        'none'
    ) : (
        `stroke-dashoffset ${props.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`
    ),
    ...props.circleStyles
  }),
  svg: {
    overflow: "visible"
  }
});

export default function(props) {
    const { 
        label,
        children,
        className, 
        style,
        progressProps={},
        labelProps={},
        value,
        labelValue,
        color=DEFAULT_THEME_COLORS.Main,
        variant,
        delayAnimation=0,
        animationDuration=600,
        upsideDown,
        circleStyles,
        noAnimation,
        ...others
    } = props;


    const classes = useStyles({
        color,
        animationDuration,
        circleStyles,
        noAnimation
    });

    const [ animatedVal, setAnimatedVal ] = useState(0);
    const [ animatedLabelVal, setAnimatedLabelVal ] = useState(0);

    useEffect(() => {
        setTimeout(() => setAnimatedVal(value), delayAnimation);
        setTimeout(() => setAnimatedLabelVal(labelValue), delayAnimation);
    }, []);


    return (
        <div 
            className={cn(
                'circular-progress-bar-l1',
                {"upside-down": upsideDown},
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            <div className="bar-title">
                {label}
            </div>
            <div className="bar-body">                
                <CircularProgress
                    {...progressProps}
                    className={cn(
                        "progress",
                        progressProps && progressProps.className
                    )}
                    classes={classes}
                    value={noAnimation ? value : animatedVal}
                    variant={variant}
                />
                <span 
                    {...labelProps}
                    className={cn(
                        "progress-label",
                        labelProps && labelProps.className
                    )}
                >
                    {noAnimation ? labelValue : animatedLabelVal}
                </span>
            </div>
        </div>
    );
}