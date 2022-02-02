import React from 'react';
import cn from "classnames";

import Skeleton from '@material-ui/lab/Skeleton';

import Button from "../../DefaultButton";

export default function(props) {
	const { 
        getSelectedOption,
        optionGroups=[],
        selectedOptions,
        handleSelection,
        skeleton,
        className, 
        style,
        ...others
    } = props;

    if(skeleton){
        return renderSkeleton();
    }



    return (
        <div 
        	className={cn(
        		'options-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            {optionGroups.map((optionGroup, groupIndex) => {    
                const selectedOption = getSelectedOption(
                    selectedOptions, 
                    optionGroups, 
                    groupIndex
                );

                return ( 
                    <div 
                        key={groupIndex}
                        className="option-set"
                    >
                        <div className="title">
                            <span className="label">
                                {optionGroup.title}:
                            </span>
                            {' '}
                            <span className="value">
                                {selectedOption.fullTitle}
                            </span>
                        </div>
                        <div className="options">
                            {optionGroup.options.map((option, optionIndex) => {
                                const isSeleceted = selectedOptions[groupIndex][optionIndex];
                                return (
                                    <Button 
                                        key={optionIndex}
                                        className="option"
                                        containerProps={{
                                            className: "option-container"
                                        }}
                                        size="small"
                                        theme={isSeleceted ? "green" : "grayOutline"}
                                        round={false}
                                        onClick={e => handleSelection(groupIndex, optionIndex)}
                                    >
                                        {option.fullTitle}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                )
                
            })}
        </div>
    );
}



function renderSkeleton(){

    const inlineTextStyle = {
        display: "inline-block",
        verticalAlign: "middle"
    }

    const optionsLooper = [null, null, null, null];

    return (        
        <div className='options-l2'>
            <div className="option-set">
                <div className="title">
                    <Skeleton 
                        style={{
                            margin: "6px 0"
                        }}
                        variant="text" 
                        width="100px" 
                        height="20px"
                    /> 
                </div>
                <div className="options">
                    {optionsLooper.map((option, optionIndex) => (
                            <Skeleton 
                                key={optionIndex}
                                className="option"
                                containerProps={{
                                    className: "option-container"
                                }}              
                                style={{
                                    ...inlineTextStyle,
                                    margin: (optionIndex > 0) ? "0 10px" : "0"
                                }}
                                width="60px"
                                height="30px"
                            />
                    ))}
                </div>
            </div>
                
        </div>
    );
}