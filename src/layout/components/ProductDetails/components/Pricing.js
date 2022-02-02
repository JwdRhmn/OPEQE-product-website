import React, { useState } from 'react';
import cn from "classnames";

import Skeleton from '@material-ui/lab/Skeleton';


import currencify from "../../../../functions/currencify";

import CheckBox from "../../CheckBox";
import CuttedLabel from "../../CuttedLabel";
import SpecialDetailsNotification from "../../SpecialDetailsNotification";

export default function(props) {
	const { 
        className, 
        style,
        price,
        off,
        inStock,
        couponDescription,
        skeleton,
        isMobile,
        subscribe,
        special,
        ...others
    } = props;

    const [showSpecialDetails, setShowSpecialDetails] = useState(false);

    function toggleSpecial() {
        setShowSpecialDetails(!showSpecialDetails);    
    }

    const offPrice = price * (1 - (off || 0) / 100);
    const difference = price - offPrice;

    if(skeleton){
        return renderSkeleton();
    }

    return (
        <>
            {special && (
                <SpecialDetailsNotification
                    onUse={toggleSpecial}
                    useText={"Got It"}
                    title={special.title}
                    description={
                        <>
                            <div>
                                {special.description}
                            </div>
                            <div>
                                {special.policy}
                            </div>
                        </>
                    }
                    img={special.image}
                    open={showSpecialDetails}
                    onClose={toggleSpecial}
                />
            )}
            <div 
            	className={cn(
            		'pricing-l2',
            		className
            	)} 
            	style={{
                    ...style 
                }}
                {...others}
            >            
                <table className="price-container">
                    {(off > 0) ? (
                        <>
                            <tr className="price small lined">
                                <td>List Price:</td>
                                <td>{currencify(price)}</td>
                            </tr>
                            <tr className="price">
                                <td>Price:</td>
                                <td>{currencify(offPrice)}</td>
                            </tr>
                            <tr className="price small green">
                                <td>You Save:</td>
                                <td>{currencify(difference)} ({off}%)</td>
                            </tr>
                        </>
                    ) : (
                        <tr className="price">
                            <td>Price:</td>
                            <td>{currencify(price)}</td>
                        </tr>
                    )}
                </table> 
                {special && (
                    <div className="special">
                        <CuttedLabel 
                            noStart
                            style={{
                                backgroundColor: special.color
                            }}
                        >
                            save {special.isPercent ? (
                                `${special.discount}%`
                            ) : (
                                currencify(special.discount)
                            )}
                        </CuttedLabel>
                        <CheckBox className="checkbox" />
                        <span className="description">
                            {special.title}
                            {" "}                        
                            {!isMobile ? (
                                <>         
                                    {special.description}                       
                                    <span 
                                        className="show-details"
                                        onClick={toggleSpecial}
                                    >
                                        Details
                                    </span>
                                </>
                            ) : (
                                <>
                                    with {special.type}
                                </>
                            )}
                        </span>
                    </div>
                )}
                {subscribe && (
                    <div className="subscribe">
                        {subscribe.title}{subscribe.description}
                    </div>
                )}
                <span 
                    className={cn(
                        "stock",
                        {"red": !inStock}
                    )}
                >
                    {!inStock ? "Out of Stock" : "In Stock"}
                </span>
            </div>
        </>
    );
}


function renderSkeleton(){

    const textStyle = {
        display: "inline-block",
        verticalAlign: "middle"
    }    

    return (        
        <div className='pricing-l2'>            
            <Skeleton 
                style={textStyle}
                variant="text" 
                width="60px" 
            />
            <Skeleton 
                style={{
                    ...textStyle,
                    margin: "0 10px",
                }}
                variant="text" 
                width="30px" 
            />
            <Skeleton
                variant="text" 
                width="70px" 
            />
        </div>
    );
}