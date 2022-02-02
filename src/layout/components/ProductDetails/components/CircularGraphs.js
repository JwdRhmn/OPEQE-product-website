import React from 'react';
import cn from "classnames";
import LazyLoad from 'react-lazyload';

import Skeleton from '@material-ui/lab/Skeleton';

import Gauge from "../../Gauge";

export default function(props) {
	const { 
        className, 
        style,
        graphs,
        skeleton,
        ...others
    } = props;

    if(skeleton){
        return renderSkeleton();
    }

    return (
        <div 
        	className={cn(
        		'circular-graphs-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <LazyLoad
                offset={-180}
                height={100}
            >
                {graphs.map((graph, index) => (
                    <div 
                        key={index}
                        className="graph"
                    >
                        <Gauge
                            size={64}
                            fontSize={14}
                            value={graph.value}
                        />
                        <div className="graph-label">
                            {graph.name}
                        </div>
                    </div>
                ))}
            </LazyLoad>
        </div>
    );
}


function renderSkeleton(){

    const looper = [null, null, null, null];

    const circleStyle = {
        display: "inline-block",
        margin: "10px 2px"
    }

    return (
        <div 
            className="circular-graphs-l2"
        >         
            {looper.map( (item, index) => (
                <Skeleton 
                    style={circleStyle}
                    variant="circle" 
                    width="70px"
                    height="70px"
                />  
            ))}                            
        </div>
    );
}