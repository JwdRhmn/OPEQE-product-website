import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

export default function(props) {
	const { 
        className, 
        style,
        img,
        text,
        href,
        ...others
    } = props;

    const imageSrc = img ? img : require("../../assets/images/photos/default-group-card-image.png");

    return (
        <Link 
        	className={cn(
        		'group-card-l1',
        		className
        	)} 
            to={href}
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="image">
                <img src={imageSrc} alt={text} />
            </div>
            <div className="text">
                {text}
            </div>
        </Link>
    );
}