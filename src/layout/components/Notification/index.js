import React from 'react';
import cn from "classnames";

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

export default function(props) {
    const { 
        className, 
        style,
        PaperProps,
        timeout=350,
        ...others
    } = props;


    return (
        <Dialog
            className={cn(
                'notification-l1',
                className
            )} 
            style={{
                ...style 
            }}
            PaperProps={{
                ...PaperProps,
                className: cn(
                    'paper',
                    PaperProps && PaperProps.className
                ),
            }}
            TransitionComponent={Transition}
            transitionDuration={timeout}
            {...others}
        />
    );
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});