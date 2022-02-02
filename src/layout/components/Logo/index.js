import React from 'react';
import cn from "classnames";

import { ReactComponent as LogoSVG } from  "../../assets/images/logo/logo.svg"

export default function(props) {
	const { 
        width='90', 
        component: Component="div",
        align='baseline',
        className, 
        style,
        ...others
    } = props;
    const ratio = 3.04;
    return (
        <Component 
        	className={cn(
        		'logo-l1',
        		className
        	)} 
        	style={{
                width: `${width}px`,
                height: `${parseInt(width / ratio)}px`,
                verticalAlign: align,
                ...style 
            }}
            {...others}
        >
             <LogoSVG />
        </Component>
    );
}