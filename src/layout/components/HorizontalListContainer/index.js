import React, { useState } from "react";
import cn from "classnames";

import Header from "./components/Header";
import HorizontalListScrollBar from "../HorizontalListScrollBar";
import HorizontalScrollList from "../HorizontalScrollList/";

export default function Index(props){
    const { 
        className, 
        style={},
        children,
        title,
        subTitle,
        linkText,
        linkTarget,
        frameSize,
        skeleton,
        listProps,
        freeScroll,
        ...others
    } = props;

    const initialState = {
            currentFrame: 0,
            frameCount: 0,
    };    
    const [ state, setState ] = useState(initialState);
    const [ scroll, setScroll ] = useState(0);



    function onFrameChange(count){
        setState({
            ...state,
            frameCount: count,
            currentFrame: 0,
        });
    }

    function onNext(){
        const { frameCount, currentFrame } = state;
        if(currentFrame === frameCount){
            return;
        }
        setState({
            ...state,
            currentFrame: currentFrame + 1,
        });
    }

    function onPrev(){
        const { currentFrame } = state;
        if(currentFrame === 0){
            return;
        }
        setState({
            ...state,
            currentFrame: currentFrame - 1,
        });
    }

    function handleScroll(event){
        const target = event.target;
        const scrollPercent = 100 * target.scrollLeft / (target.scrollWidth - target.offsetWidth);
        setScroll(scrollPercent)
    }


	return (
		<div className={cn(
                'horizontal-list-container-l1',
                className,
            )} 
            style={{
                ...style 
            }}     
            {...others}
        >
			<Header 
                title={title}
                subTitle={subTitle}
                linkText={linkText}
                linkTarget={linkTarget}
                skeleton={skeleton}
            />
			<HorizontalListScrollBar 
                className="scroll-bar"
                stepCount={state.frameCount}
                currentStep={state.currentFrame}
                freeScroll={freeScroll}
                scrollIndex={scroll}
                skeleton={skeleton}
            />
			<HorizontalScrollList 
                className="list"
                freeScroll={freeScroll}
                onFrameCountChange={onFrameChange}
                frameCount={state.frameCount}
                frameSize={frameSize}
                currentFrame={state.currentFrame}
                onNext={onNext}
                onPrev={onPrev}
                hideNext={state.frameCount === state.currentFrame}
                hidePrev={state.currentFrame === 0}
                onScroll={handleScroll}
                skeleton={skeleton}
                {...listProps}
            >
				{children}
			</HorizontalScrollList>
		</div>
	);
}


