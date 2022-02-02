import React, { useState } from 'react';
import cn from "classnames";

import Rating from '@material-ui/lab/Rating';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Skeleton from '@material-ui/lab/Skeleton';

import RateDetails from "./RateDetails";

import readableNumber from "../../../../functions/readableNumber";

export default function(props) {
	const { 
        className, 
        style,
        rate,
        ratingCount,
        rateByStar,
        skeleton,
        ...others
    } = props;

    const [ showDetails, setShowDetails ] = useState(false);

    function openDetails(){
        setShowDetails(true);
    }

    function closeDetails(){
        setShowDetails(false);
    }

    if(skeleton){
        return renderSkeleton();
    }

    return (
        <div 
        	className={cn(
        		'rating-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <span 
                className="stars"
                onMouseEnter={openDetails}
                onMouseLeave={closeDetails}
            >
                <Rating
                    value={rate} 
                    precision={0.5} 
                    readOnly
                />
                <span className="drop-down-icon">
                    <KeyboardArrowDownIcon className="icon" />
                </span>
                <RateDetails 
                    open={showDetails}
                    rate={rate}
                    ratingCount={ratingCount}
                    rateByStar={rateByStar}
                />
            </span>
            <span className="count">
                {readableNumber(ratingCount)} ratings
            </span>
        </div>
    );
}


function renderSkeleton(){

    const textStyle = {
        display: "inline-block",
    }    

    return (
        <div className='rating-l2'>
            <span className="stars">
                <Rating
                    value={0} 
                    precision={0.5} 
                    readOnly
                />
            </span>
            <span className="count">
                <Skeleton 
                    style={textStyle}
                    variant="text" 
                    width="90px" 
                />
            </span>
        </div>
    );
}