import React, { useRef, useEffect } from 'react';
import cn from "classnames";

import useMap from "../../../hooks/useMap";

import { DEFAULT_MAP_CENTER } from "../../../config/map";

export default function({ 
        className, 
        style,
        pos,
        markerType='shop',
        ...others
}) {

    const {
        loadingAPI: googleAPILoading,
        container,
        dropMarker,        
        changeMarker,
    } = useMap({
    });



    const marker = useRef(null);

    const isPosValid = pos && pos.lat && pos.lng;

    useEffect(() => {
        if(googleAPILoading){
            return;
        }

        let center;

        if(isPosValid){
            center = pos;
        } else {
            center = DEFAULT_MAP_CENTER;
        }

        if(marker.current !== null){
            changeMarker({  
                markerRef:marker.current,    
                pos: center,
                zoom: 14,
            });
        } else {
            marker.current = dropMarker({
                icon: {
                    url: require(`../../../assets/images/icons/${
                        (markerType === 'shop' || !isPosValid) ? (
                            'restaurant-marker.svg'
                        ) : (
                            'person-marker.svg'
                        )
                    }`),
                },
                pos: center,
                zoom: 14,
            });
        }
    }, [googleAPILoading, marker.current, pos]);

    return (
        <div 
        	className={cn(
        		'map-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div
                className="map" 
                ref={container}
            />
        </div>
    );
}