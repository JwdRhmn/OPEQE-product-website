import React from 'react';
import cn from "classnames";

import { CSSTransition } from "react-transition-group";

export default function(props) {
	const { 
        className, 
        style,
        location,
        match,
        history,
        staticContext,
        enterTimeout,
        exitTimeout,
        delay,
        animationClass,
        baseClassName,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...others
    } = props;

    return (
        <CSSTransition
            className={cn(
                'delayable-css-transition-l1',
                className
            )} 
            style={{
                ...style 
            }}
            timeout={{ enter: enterTimeout + delay, exit: exitTimeout + delay }}
            onExit={
                node => {
                    if(onExit){
                        onExit(node);
                    }
                    const currentClass = node.getAttribute('class');
                    node.setAttribute('class', `${currentClass} ${animationClass}-before-exit`)
                    setTimeout(
                        () => node.setAttribute('class', `${currentClass} ${animationClass}-exit`)
                    , delay)
                }
            }
            onExiting={
                node => {
                    if(onExiting){
                        onExiting(node);
                    }
                    let currentClass = node.getAttribute('class');
                    currentClass = currentClass.replace(`${animationClass}-before-exit `, '');
                    setTimeout(
                        () => node.setAttribute('class', `${currentClass} ${animationClass}-exit ${animationClass}-exit-active`)
                    , delay)
                }
            }
            onExited={
                node => {
                    if(onExited){
                        onExited(node);
                    }
                    let currentClass = node.getAttribute('class');
                    currentClass = currentClass.replace(`${animationClass}-exit `, '');
                    currentClass = currentClass.replace(`${animationClass}-exit-active `, '');
                    node.setAttribute('class', `${currentClass} ${animationClass}-exit-done`)
                }
            }
            onEnter={
                node => {
                    if(onEnter){
                        onEnter(node);
                    }
                    const currentClass = node.getAttribute('class');
                    node.setAttribute('class', `${currentClass} ${animationClass}-before-enter`)
                    setTimeout(
                        () => node.setAttribute('class', `${currentClass} ${animationClass}-enter`)
                    , delay)
                }
            }
            onEntering={
                node => {
                    if(onEntering){
                        onEntering(node);
                    }
                    let currentClass = node.getAttribute('class');
                    currentClass = currentClass.replace(`${animationClass}-before-enter `, '');
                    setTimeout(
                        () => node.setAttribute('class', `${currentClass} ${animationClass}-enter ${animationClass}-enter-active`)
                    , delay)
                }
            }
            onEntered={
                node => {
                    if(onEntered){
                        onEntered(node);
                    }
                    let currentClass = node.getAttribute('class');
                    currentClass = currentClass.replace(`${animationClass}-enter `, '');
                    currentClass = currentClass.replace(`${animationClass}-enter-active `, '');
                    node.setAttribute('class', `${currentClass} ${animationClass}-enter-done`)
                }
            }
            {...others}
        />
    );
}