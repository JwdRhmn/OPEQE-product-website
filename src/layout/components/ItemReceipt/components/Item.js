import React, { useState, useEffect } from 'react';
import cn from "classnames";


import FavoriteIcon from "@material-ui/icons/Favorite";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "../../DefaultButton/";
import CustomListItem from "../../CustomListItem";
import NumberSelect from "../../NumberSelect";

import currencify from "../../../../functions/currencify";

import { CONFIG_RTL } from "../../../config/layout/";
import useSwipe from "../../../hooks/useSwipe/";

export default function(props) {
    const { 
        className, 
        index,
        quantity,
        style,
        onFav,
        onDel,
        onInc,
        onDec,
        noOptions,
        title,
        productOptions=[],
        basePrice,
        ...others
    } = props;

    const [ options, setOptions ] = useState(false);

    const totalPrice = productOptions.reduce((total, { price }) => total + price , 0) + basePrice;

    const { handleStart, handleEnd } = useSwipe({
        onDirRight: showOptions,
        onDirLeft: hideOptions,
        rtl: CONFIG_RTL,
    }); 

    useEffect(() => {
        if(options){
            window.addEventListener('click', hideOptions);
        } else {
            window.removeEventListener('click', hideOptions);
        }
        return () => {
            window.removeEventListener('click', hideOptions);
        }
    }, [options]);


    function hideOptions(){
        setOptions(false);
    }

    function showOptions(){
        if(noOptions){
            return;
        }
        setOptions(true);
    }

    return (
        <div 
            className={cn(
                'item-l2',  
                {'pointer': !noOptions},
                className
            )} 
            style={{
                ...style 
            }}
            onClick={showOptions}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            onMouseUp={handleEnd}
            onTouchEnd={handleEnd}
            {...others}
        >
            <div className={cn(
                    "options",
                    {'open': options},
                )}
            >
                <Button 
                    theme="light"
                    className="button"
                    containerProps={{
                        className: "button-container",
                    }}
                    round={false}
                    onClick={onDel}
                >
                    <DeleteIcon className="icon" />
                </Button>
                <Button
                    className="button"
                    containerProps={{
                        className: "button-container",
                    }}
                    round={false}
                    onClick={onFav}
                >
                    <FavoriteIcon className="icon" />
                </Button>                
            </div>
            <div className="content">
                <CustomListItem
                    component="div"
                    className="title"
                    icon={
                        <span className="item-num">
                            {quantity}
                        </span>
                    } 
                    noBorder                   
                >
                    {title}
                </CustomListItem>   
                <div className="quantity">                    
                    <NumberSelect 
                        className="number-select"
                        buttonProps={{
                            className: "number-button"
                        }}
                        onIncrement={onInc}
                        onDecrement={onDec}
                        value={quantity}
                        onClick={e => e.stopPropagation()}
                        theme="light-gray"
                        round={false}
                        noValue
                    />
                </div>
                {productOptions.map(({
                    price,
                    name,
                }, index) => {
                    return (
                        <CustomListItem
                            key={index}
                            component="div"
                            className="options-item"
                            action={
                                <span className="price">
                                    {currencify(price)}
                                </span>
                            }
                            icon={
                                <DoneOutlineIcon className="icon" />
                            } 
                            noBorder                   
                        >
                            {name}
                        </CustomListItem>
                    );
                })}
                
                <CustomListItem
                    component="div"
                    className="total-price"
                    action={
                        <span className="price">
                            {currencify(totalPrice * quantity)}
                        </span>
                    }      
                    noBorder              
                >
                    Click for options
                </CustomListItem>
            </div>                         
        </div>
    );
}