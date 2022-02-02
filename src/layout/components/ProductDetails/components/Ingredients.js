import React, { useState } from 'react';
import { Link } from "react-router-dom";
import cn from "classnames";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';

import LinearProgressBar from "../../LinearProgressBar";





export default function(props) {
	const { 
        graphs,
        skeleton,
        hrefCreator,
        className, 
        style,
        ...others
    } = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(skeleton){
        return renderSkeleton();
    }

    const ContainerComponent = hrefCreator ? Link : "div";

    return (
        <div 
        	className={cn(
        		'ingredients-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <Tabs
                className="tabs"
                value={value} 
                onChange={handleChange} 
                TabIndicatorProps={{
                    className: "indicator"
                }}
            >
                {graphs.map((graphData, index) => (
                    <Tab 
                        key={index} 
                        label={graphData.name}
                    />
                ))}
            </Tabs>
            <div className="body">
                {graphs[value].value.map((graphData, index) => {return (
                    <ContainerComponent
                        key={index}
                        to={hrefCreator && hrefCreator(graphData)}
                    >
                        <LinearProgressBar                            
                            className="progress" 
                            variant="determinate"
                            value={graphData.value}
                            height={30}
                            label={graphData.name}
                            delayAnimation={100}
                            round
                        />
                    </ContainerComponent>
                )})}
            </div>
        </div>
    );
}


function renderSkeleton(){

    const graphLooper = [20, 40, 60, 30];
    const tabLooper = [null, null];

    return (
        <div className="ingredients-l2" >             
            <Tabs
                className="tabs"
                value={0}  
                TabIndicatorProps={{
                    className: "indicator"
                }}
            >
                {tabLooper.map((graphData, index) => (
                    <Tab 
                        key={index} 
                        label={
                            <Skeleton 
                                variant="text" 
                                width="100px" 
                                height="20px"
                            /> 
                        }
                    />
                ))}
            </Tabs>
            <div className="body">
                {graphLooper.map((item, index) => (
                    <LinearProgressBar
                        key={index}
                        className="progress" 
                        variant="determinate"
                        value={item}
                        height={30}
                        delayAnimation={100}
                        round
                        skeleton
                    />
                ))}
            </div>

        </div>
    );
}


