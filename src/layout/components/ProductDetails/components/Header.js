import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Skeleton from '@material-ui/lab/Skeleton';

import Rating from "./Rating";

export default function(props) {
	const { 
        className, 
        style,
        title,
        type,
        category,
        manufacturer,
        rate,
        ratingCount,
        rateByStar,
        skeleton,
        ...others
    } = props;


    if(skeleton){
        return renderSkeleton();
    }

    return (
        <div 
        	className={cn(
        		'header-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="tag-container">
                <span 
                    className="tag"
                    style={{
                        backgroundColor: type.color
                    }}
                >
                    {type.title}
                </span>
                <span 
                    className="tag"
                    style={{
                        backgroundColor: category.color
                    }}
                >
                    {category.title}
                </span>
            </div>
            <div className="title">
                {title}
            </div>
            <div className="sub-title">
                by 
                {" "}
                <Link
                    className="link" 
                    style={{
                        color: manufacturer.color
                    }}
                >
                    {manufacturer.title}
                </Link>
            </div>
            <Rating 
                rate={rate}
                ratingCount={ratingCount}
                rateByStar={rateByStar}
            />
        </div>
    );
}




function renderSkeleton(){

    return (
        <div 
            className='header-l2' 
        >
            <div className="type-container">
                <Skeleton
                    variant="text" 
                    width="60px" 
                />
            </div>
            <div className="title">
                <Skeleton 
                    variant="text" 
                    width="250px" 
                /> 
            </div>
            <div className="sub-title">
                <Skeleton 
                    variant="text" 
                    width="80px" 
                />
            </div>
            <Rating 
                skeleton
            />
        </div>
    );
}