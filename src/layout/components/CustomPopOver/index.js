import React from 'react';
import cn from "classnames";

import Popover from '@material-ui/core/Popover';


export default function(props) {
    const { 
        className, 
        style,
        children,
        ...others
    } = props;

    return (
        <Popover
            PaperProps={{
                className: cn(
                    'pop-over-l1',
                    className
                ),
                style:{
                    ...style,
                }
            }}            
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }} 
            {...others}
        >

            {children}   

        </Popover>
    );
}