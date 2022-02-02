import React from 'react';
import cn from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

import LinearProgressBar from "../../LinearProgressBar";

import readableNumber from "../../../../functions/readableNumber";


export default function(props) {
	const { 
        rate,
        ratingCount,
        rateByStar,
        open,
        className, 
        style,
        ...others
    } = props;

    const max = Math.max(...rateByStar);

    return (
        <TransitionGroup 
            className={cn(
                'rate-details-l2',
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            <CSSTransition
                key={open}
                timeout={{ enter: 600, exit: 400 }}                     
                classNames="fade"
            >
                {open ? (
                    <div className="details">
                        <div className="body">
                            <div className="exact">
                                <Rating
                                    value={2.5} 
                                    precision={0.5} 
                                    readOnly
                                />
                                <span className="value">
                                    {rate} out of 5
                                </span>
                            </div>
                            <div className="raters">
                                {readableNumber(ratingCount)} customer ratings
                            </div>
                            <div className="rate-lines">                                                        
                                {rateByStar.map( (percentage, index) => (
                                    <Grid 
                                        key={index}
                                        className={cn(
                                            "rate-line",
                                            {"max": percentage === max}
                                        )}
                                        container
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <span className="label">
                                            {5 - index}  Star{((5 - index) > 0) && "s"}
                                        </span>
                                        <LinearProgressBar
                                            className="progress" 
                                            variant="determinate"
                                            value={percentage}
                                            height={8}
                                            barColor="skyblue"
                                            delayAnimation={100}
                                            round
                                        />
                                        <span className="percentage">
                                            {percentage}
                                        </span>
                                    </Grid>
                                ))}
                            </div>
                        </div>
                        <div className="pointer" />
                        <div className="palceholder" />
                    </div>
                ) : (
                    <div />
                )}
            </CSSTransition>
        </TransitionGroup>
    );
}