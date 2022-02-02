import { useState } from 'react';


export default function({ 
    onDirLeft, 
    onDirRight, 
    onLeft, 
    onRight, 
    rtl=false, 
    sensitivity=10 
}) {


    const initialState={
        downX: null,
        downY: null,
    }
    const [ state, setState ] = useState(initialState);    


    function handleStart(event){
        const pos = getPos(event);
        setState({
            ...state,
            downX: pos.clientX,
            downY: pos.clientY,
        })
    }

    function handleEnd(event){
        const { downX, downY } = state;
        const { clientX, clientY } = getPos(event);    

        if(Math.abs(downY - clientY) > 50 ){
            return;
        }

        if((downX - clientX) > sensitivity){
            if(!rtl && onDirLeft){
                onDirLeft();    
            } else if(rtl && onDirRight){
                onDirRight();
            }
            if(onLeft){
                onLeft();
            }
            
        }
        if((downX - clientX) < -sensitivity){
            if(!rtl && onDirRight){
                onDirRight();    
            } else if(rtl && onDirLeft){
                onDirLeft();
            }
            if(onRight){
                onRight();
            }
        }
    }



    return {
        handleStart,
        handleEnd,
    };

}

function getPos(event) { 
    return event.changedTouches ? event.changedTouches[0] : event;
};
