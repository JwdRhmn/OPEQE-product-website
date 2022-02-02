import React, { useState, useEffect } from 'react';
import cn from "classnames";


import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import setColorAlpha from "../../../functions/setColorAlpha";

import { DEFAULT_THEME_COLORS } from "../../config/layout";

const useStyles = makeStyles({
  colorPrimary: props => ({
    backgroundColor: props.baseColor,
  }),
  barColorPrimary: props => ({
    backgroundColor: props.barColor,
  }),
  bar: props => ({
    transition: `transform ${props.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    borderRadius: props.round && "30px"
  }),
  root: props => ({
    border: props.border && `0.4px solid ${props.borderColor}`,
  })
});

export default function(props) {
	const { 
        label,
        children,
        className, 
        style,
        progressProps={},
        value,
        barColor=DEFAULT_THEME_COLORS.Main,
        baseColor=DEFAULT_THEME_COLORS.UltraLightGray,
        border,
        borderColor=DEFAULT_THEME_COLORS.MediumGray,
        variant,
        delayAnimation=0,
        animationDuration=600,
        noAnimation,
        height="30px",
        round,
        skeleton,
        ...others
    } = props;
    
    const classes = useStyles({
        baseColor: skeleton ? DEFAULT_THEME_COLORS.UltraLightGray : baseColor,
        barColor:  skeleton ? DEFAULT_THEME_COLORS.MediumLightGray : barColor,
        animationDuration,
        border:  skeleton ? false : true,
        borderColor,
        round
    });

    const [ animatedVal, setAnimatedVal ] = useState(0);

    useEffect(() => {
        setTimeout(() => setAnimatedVal(value), delayAnimation);
    }, [ value ]);

    return (
        <div 
        	className={cn(
        		'linear-progress-bar-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <LinearProgress
                {...progressProps}
                className={cn(
                    "progress-container",
                    progressProps && progressProps.className
                )}
                style={{
                    height: height,
                    borderRadius: round && "30px",
                    ...(progressProps ? progressProps.style : {})
                }}
                classes={classes}
                value={animatedVal}
                variant={variant}
            />
            <span className="progress-label">
                {label}
            </span>
        </div>
    );
}