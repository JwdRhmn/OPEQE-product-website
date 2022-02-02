import React, { useRef, useEffect, useState } from "react";
import cn from "classnames";

export default props => {
    const {
    	value="pickup",
    	onChange,
        className,
        style,
        ...others
    } = props;

    const [ markerStyle, setMarkerStyle ] = useState({});
    const delivery = useRef();
    const pickup = useRef();
    
    useEffect(() => {
    	let target = {};
    	if(value === 'delivery'){
    		target = delivery;
    	}
    	if(value === 'pickup'){
    		target = pickup;
    	}
		if(target.current) {
			setMarkerStyle({
				transform: target.current.offsetLeft,
				width: target.current.offsetWidth
			});
		} else {
			setMarkerStyle({});
		}
    }, [delivery, pickup, value])

    function handleClick(type){
    	if(onChange){
    		onChange(type)
    	}
    }

    
    return (
        <div
            className={cn(
            	"type-select-l2", 
            	className
            )}
            style={{
                ...style
            }}
            {...others}
        >
			<div 
				className="marker" 
				style={{
					transform: `translateX(${markerStyle.transform}px)`,
					width: `${markerStyle.width || 0}px`,
				}}
			/>
        	<div 
        		className="item"
        		onClick={() => handleClick('delivery')}
        		ref={delivery}
        	>
				Delivery
			</div>
			<span className="seperator" >
				or
			</span>
			<div 
				className="item"
				onClick={() => handleClick('pickup')}
				ref={pickup}
			>
				Pickup
			</div>
        </div>
    )
}