import React from 'react';
import cn from "classnames";

import Skeleton from '@material-ui/lab/Skeleton';


export default function(props) {
	const { 
        className, 
        style,
        text,
        skeleton,
        descriptions,
        ...others
    } = props;

    if(skeleton){
        return renderSkeleton();
    }

    return (
        <div 
        	className={cn(
        		'descriptions-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}            
            {...others}
        >
            {descriptions.map((description, index) => (
                <p 
                    className="paragraph"
                    key={index}
                    dangerouslySetInnerHTML={{__html: description}}
                />

            ))}
        </div>
    );
}


function renderSkeleton(){
    const textStyle = {
        margin: "10px 0",
    }

    const looper = [null, null, null, null, null];

    return (
        <div 
            className="descriptions-l2"
        >         
                {looper.map((item, index) => (
                    <Skeleton 
                        style={textStyle} 
                        variant="text" 
                        width="100%" 
                    />  
                ))}  
                <Skeleton 
                    style={textStyle} 
                    variant="text" 
                    width="40%" 
                /> 
                    
        </div>
    );
}