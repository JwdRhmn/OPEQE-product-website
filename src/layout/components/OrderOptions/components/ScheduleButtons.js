import React from 'react';
import cn from "classnames";

import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";

export default function(props) {
	const {  
        className, 
        style,
        loading,
        onSubmit,
        breakpoints,
        ...others
    } = props;

    return (
        <BottomFixedContainer 
        	style={{
                ...style 
            }}
            className={cn(
                "schedule-buttons-l2",
                className,
            )}
            breakpoints={breakpoints}
            {...others}
        >                    
            <Button 
                width="100%"
                waiting={loading}
                onClick={onSubmit}
                block
            >
                Done
            </Button>
        </BottomFixedContainer>

    );
}