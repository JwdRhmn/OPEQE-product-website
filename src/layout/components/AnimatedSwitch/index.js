import React, { useContext, useRef, useEffect } from 'react';
import cn from "classnames";
import { Switch, __RouterContext, matchPath } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import isMobile from "../../../functions/isMobile";

import PageContainer from "../PageContainer";

export default function(props) {
    const { 
        className, 
        style,
        containSearch,
        children,
        isPage,
        ...others
    } = props;

    const transitionDuration = 600;

    const { location, history } = useContext(__RouterContext);

    const animationKey = useRef(location.pathname);

    useEffect(() => {
        if(!isMobile){
            window.scroll({ top: 0, behavior: 'smooth' });
        }
    }, [ location.pathname, location.search ])

    const isBack = history.action.toLowerCase() === 'pop';

    let switchKey = undefined
    React.Children.forEach(children,
      (child) => {
        if(child !== null && matchPath(location.pathname,child.props) && switchKey === undefined){
          switchKey = child.props.path
        }
      }
    )

    const isChild = ( !switchKey || switchKey.split('/').length === location.pathname.split('/').length );

    if(isChild){
        animationKey.current = location.pathname + location.search;
    }

    if(!isMobile){
        return (
            <WrapIfPage isPage={isPage}>
                <Switch 
                    children={children}
                    {...others}
                />
            </WrapIfPage>
        )
    }

    return (
        <TransitionGroup 
            className={cn(
                "animated-switch-l1",
                "transform",
                "opacity",
                {"back": isBack}
            )}
        >
            <CSSTransition
                key={animationKey.current}
                timeout={{ enter: transitionDuration, exit: transitionDuration }}
                // onExit={true && (
                //     node => {
                //         node.style.position = "fixed";
                //         node.style.top = -1 * window.scrollY + "px";
                //     }
                // )}
                onEnter={
                    node => {                        
                        node.style.top = window.scrollY + "px";
                    }
                }
                onEntered={
                    node => {
                        node.style.top = "0";                        
                        window.scrollTo(0,0);
                    }
                }
                classNames="swipe"
            >
                <section className="route-section">
                    <WrapIfPage isPage={isPage}>
                        <Switch 
                            location={location}
                            children={children}
                            {...others}
                        />
                    </WrapIfPage>
                </section>
            </CSSTransition>
        </TransitionGroup>
    );
}


const WrapIfPage = props => {
    const { isPage, children} = props;
    
    if(!isPage){
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <PageContainer>
            {children}
        </PageContainer>
    )
}