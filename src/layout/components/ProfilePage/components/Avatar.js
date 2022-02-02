import React from 'react';
import cn from "classnames";

import PersonIcon from "@material-ui/icons/PersonOutline";

export default function(props) {
	const {  
        className, 
        style,  
        fname,
        lname,    
        date,  
        ...others
    } = props;

    return (
        <div 
        	style={{
                ...style 
            }}
            className={cn(
                "avatar-l2",
                className,
            )}            
            {...others}
        >
            <span className="image">
                <PersonIcon fontSize="inherit" />
            </span>
            <br/>
            <span className="name">
                {fname} {lname}
            </span>
            <br/>
            <span className="color-MediumGray">
                Member Since
            </span>
            <br/>
            <span className="color-DimGray">
                {date}
            </span>
        </div>                        
    );
}