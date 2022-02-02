import React, { useState, useEffect } from "react";
import cn from "classnames";

export default function(props) {
    const {
        className,
        style,
        value = 0,
        delayAnimation = 0,
        size = 100,
        fontSize = 24,
        ...others
    } = props;

    const strokeLength = 126.92;
    const storkeWidth = "15";

    const [animatedVal, setAnimatedVal] = useState(0);

    useEffect(() => {
        let interval;
        setTimeout(() => {
            interval = setInterval(
                () =>
                    setAnimatedVal(prevVal => {
                        if (prevVal >= value) {
                            clearInterval(interval);
                            return value;
                        }
                        return prevVal + 1;
                    }),
                1
            );
        }, delayAnimation);
        return () => clearInterval(interval);
    }, []);

    const strokeDashoffset = getDashOffset(strokeLength, animatedVal);

    return (
        <div 
            className={cn(
                'gauge-l1',
                className
            )} 
            style={{
                width: size && `${size}px`,
                height: size && `${size}px`,

                ...style 
            }}
            {...others}
        >
            <svg
                className="svg"
                viewBox="22 22 44 44"
            >
                <circle
                    className="underlay"
                    cx="44"
                    cy="44"
                    r="20.2"
                    fill="none"
                    stroke-width={storkeWidth}
                    stroke="rgb(200, 200, 200)"
                    style={{
                        strokeDasharray: `${strokeLength}`, 
                        strokeDashoffset: `${getDashOffset(strokeLength, 100)}px`
                    }}
                />
                <circle
                    className="bar"
                    cx="44"
                    cy="44"
                    r="20.2"
                    fill="none"
                    stroke-width={storkeWidth}
                    stroke={
                        `rgba(${
                            parseInt(255 - animatedVal * 200 / 100)
                        }, ${
                            parseInt(animatedVal * 200 / 100)
                        }, 0, 1)`
                    }
                    style={{
                        strokeDasharray: `${strokeLength}`, 
                        strokeDashoffset: `${strokeDashoffset}px`
                    }}
                />
            </svg>
            <div 
                className="label"
                style={{
                    fontSize: `${fontSize}px`,
                }}
            >
                {animatedVal}%
            </div>
        </div>
    );
}


const getDashOffset = (strokeLength, value) => strokeLength * (1 - value * 0.75 / 100)