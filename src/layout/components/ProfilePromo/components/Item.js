import React from 'react';
import cn from "classnames";

export default function(props) {
	const {  
        className, 
        style,   
        text,     
        title,
        description,
        amount,
        ...others
    } = props;

    return (
        <div 
        	style={{
                ...style 
            }}
            className={cn(
                "item-l2",
                className,
            )}    
            {...others}
        >
            <div className="body">
                <span className="title">
                    {title}
                </span>
                <br/>
                <span className="sub-title">
                    {description}
                </span>
                <span className="amount">
                    <span className="super">
                        $
                    </span>
                    {amount}
                </span>
            </div>
            <div className="caption">
                Will apply on your next order
            </div>
        </div>                            
    );
}