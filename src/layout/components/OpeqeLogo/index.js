import React from 'react';
import cn from "classnames";

import { ReactComponent as DarkLogoSVG } from  "../../assets/images/opeqe/dark-logo.svg"
import { ReactComponent as LightLogoSVG } from  "../../assets/images/opeqe/light-logo.svg"

export default function(props) {
	const { 
        component: Component="div",
        width='90', 
        color="dark",
        showText,
        text="Powered By",
        textSize="20",
        className, 
        style,
        ...others
    } = props;
    const ratio = 3.04;
    return (
        <Component 
        	className={cn(
        		'opeqe-logo-l1',
        		className
        	)} 
        	style={{
                width: `${width}px`,
                height: `${parseInt(width / ratio)}px`,
                ...style 
            }}
            {...others}
        >
            { showText && (
                <div 
                    className="text"
                    style={{
                        fontSize: `${textSize}px`,
                    }}
                >
                    {text}
                </div>
            )}
            {color === 'dark' && (
                <DarkLogoSVG />
            )}
            {color === 'light' && (
                <LightLogoSVG />
            )}
        </Component>
    );
}