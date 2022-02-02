import React, { useState, useRef, useMemo } from 'react';
import cn from "classnames";

import { TimePicker } from 'antd';
import moment from 'moment';

import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Skeleton from '@material-ui/lab/Skeleton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

import CustomListItem from "../../CustomListItem";
import RadioButton from "../../RadioButton";
import CuttedLabel from "../../CuttedLabel";
import NumberSelect from "../../NumberSelect";
import Select from "../../CustomSelect";
import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";

import currencify from "../../../../functions/currencify";
import getDate from "../../../../functions/formattedDate";

import { DEFAULT_THEME_COLORS } from "../../../config/layout";
import {
  storeDeliveryTimeRange,
  subscribeTimePeriodMax,
  subscribeDeliveryDays
} from "../../../config/store";

const useStyles = makeStyles({
    content: {
        margin: "0 !important",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default function(props) {
	const { 
        hasSubscribe,
        maxAdd,
        maxSubscribe,
        initialSubscribeCount=1,
        noAddToCart,
        isFav,
        isLoggedIn,
        price,
        off,
        wantItQuestionText,
        wantItOurText,
        subscribeOff,
        manufacturer,
        skeleton,
        handleAddToCart,
        onSubscribe,
        onFav,
        labelBG,
        deliverEveryData,
        className, 
        style,
        ...others
    } = props;
    

    const now = new Date();    
    const nowFormatted = getDate(now);
    const roundedNow = roundTime({
        hour: nowFormatted.hour,
        minute: nowFormatted.minute
    })
    const startDeliveryTimeSplitted = storeDeliveryTimeRange.start.split(':');
    const startDeliveryTime = {
        hour: parseInt(startDeliveryTimeSplitted[0]),
        minute: parseInt(startDeliveryTimeSplitted[1])
    }

    const endDeliveryTimeSplitted = storeDeliveryTimeRange.end.split(':');
    const endDeliveryTime = {
        hour: parseInt(endDeliveryTimeSplitted[0]),
        minute: parseInt(endDeliveryTimeSplitted[1])
    }

    const initialDay = getStartDay(
        nowFormatted.weekDayIndex
    )
    

    const initialTime = getInitialTime({
        todayIndex: nowFormatted.weekDayIndex, 
        initialDayIndex: initialDay, 
        roundedNow, 
        startDeliveryTime
    });

    const [ mode, setMode ] = useState('one-time');
    const [ addCount, setAddCount ] = useState(1);
    const [ subscribeCount, setSubscribeCount ] = useState(initialSubscribeCount);
    const [ deliverEvery, setDeliverEvery ] = useState('default');
    const [ deliveryDay, setDeliveryDay ] = useState(initialDay);
    const [ showDeliverySettings, setShowDeliverySettings ] = useState(false);
    const [ time, setTime ] = useState( 
        moment(
            `${nowFormatted.hour}:${nowFormatted.minute}`,
            "HH:mm"
        ) 
    );
    const deliveryFreqs = useMemo(() => {
        if(!deliverEveryData){
            return [];
        }
        let max = subscribeTimePeriodMax[ deliverEveryData.inDays ];
        console.log(':::', max);
        if(!max){
            max = 4;
        }
        const out = [];
        for(let i = 1; i  <= max; i++){
            out.push(i * deliverEveryData.base);
        }
        return out;
    }, [ deliverEveryData ]);

    const rootRef = useRef(null);

    const classes = useStyles();


    function handleChange(mode){
        setMode( mode );
    }

    function handleIncrementAddCount(){
        if(maxAdd && addCount === maxAdd){
            return;
        }
        setAddCount( addCount + 1 );
    }

    function handleDecrementAddCount(){
        if(addCount === 1){
            return;
        }
        setAddCount( addCount - 1 );
    }

    function handleIncrementSubscribeCount(){
        if(maxSubscribe && subscribeCount === maxSubscribe){
            return;
        }
        setSubscribeCount( subscribeCount + 1 );
    }

    function handleDecrementSubscribeCount(){
        if(maxSubscribe === 1){
            return;
        }
        setSubscribeCount( subscribeCount - 1 );
    }

    function handleDeliverEveryChange(event){
        setDeliverEvery(event.target.value)
    }

    function scrollToRoot(){
        const root = rootRef.current;
        if(!root){
            return;
        }
        window.root = root;
        window.scroll({ top: root.offsetTop - 90, behavior: 'smooth' });
    }

    function addToCart(isBuyNow){
        handleAddToCart(addCount, isBuyNow);
    }

    function toggleShowDeliverySettings(){
        setShowDeliverySettings(!showDeliverySettings);
    }

    function handleTimeSelect(newTime){
        setTime(newTime); 
    };

    function handleSubscribe(){
        onSubscribe({
            deliverEvery: (deliverEvery === "default") ? (
                deliveryFreqs[0]
            ) : (
                deliverEvery
            ),
            deliveryDay: deliveryDay,
            time: time.format("hh:mm"),
            count: subscribeCount
        });
    }

    const isSubscibe = (mode === "subscribe");

    const offPrice = price * (1 - (off || 0) / 100);
    if(skeleton){
        return renderSkeleton({
            classes,
            noAddToCart,
            className
        });
    }

    const subOfPrice = subscribeOff.isPercent ? (
        offPrice * (100 - subscribeOff.value) / 100
    ) : (
        ((offPrice - subscribeOff.value) > 0) ? (offPrice - subscribeOff.value) : 0
    )



    const correctedStartTime = correctDate({
        deliveryDay, 
        nowFormatted, 
        startDeliveryTime, 
        endDeliveryTime,
    });

    let disabledHours = [];
    for(let i = 0; i < 24; i++){
        if(i < correctedStartTime.hour || i > endDeliveryTime.hour ){
            disabledHours.push(i);
        }
    }

    return (
        <div 
        	className={cn(
        		'order-method-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            ref={rootRef}
            {...others}
        >
            <ExpansionPanel
                className={cn(
                    "panel",
                    {"selected": !isSubscibe}
                )}
                square 
                expanded={!isSubscibe} 
                onChange={e => handleChange('one-time')}
            >
                <ExpansionPanelSummary
                    className="panel-header"
                    classes={classes}
                >
                    <CustomListItem
                        component={"div"}
                        icon={
                            hasSubscribe && (
                                <RadioButton 
                                    checked={!isSubscibe}
                                />
                            )
                        }
                        noIcon={!hasSubscribe}
                        noBorder
                    >
                        <div className="content">                            
                            <div className="title">
                                One-time
                            </div>       
                            <div className="price">
                                {currencify(offPrice)}
                            </div> 
                        </div>
                    </CustomListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                    className={cn(
                        "panel-body",
                        "buy"
                    )}
                >
                    {wantItQuestionText && (
                        <div className="want-it">
                            <span className="main">
                                {wantItQuestionText}
                            </span>
                            {" "}
                            <span className="text">                            
                                Order within
                            </span>
                            {" "}
                            <span className="highlight">
                                {wantItOurText}
                            </span>
                        </div>
                    )}
                    <div className="quantity">
                        <NumberSelect
                            className="number-select"
                            onDecrement={handleDecrementAddCount}
                            onIncrement={handleIncrementAddCount}
                            value={addCount}
                            decDisabled={addCount === 1}
                            incDisabled={addCount === maxAdd}
                            theme="light-gray"
                        />
                    </div>
                    {!noAddToCart && (
                        <Button
                            containerProps={{
                                className: "button-container"
                            }}
                            block
                            onClick={() => addToCart(false)}
                        >
                            Add To Cart
                        </Button>
                    )}
                    <Button
                        containerProps={{
                            className: "button-container"
                        }}
                        theme="darkOutline"
                        block
                        onClick={() => addToCart(true)}
                    >
                        Buy Now
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            { hasSubscribe && (
                <ExpansionPanel
                    className={cn(
                        "panel",
                        {"selected": isSubscibe}
                    )}
                    classes={classes}
                    square 
                    expanded={isSubscibe} 
                    onChange={e => handleChange('subscribe')}
                >
                    <ExpansionPanelSummary
                        className="panel-header"
                        classes={classes}
                    >
                        <CustomListItem
                            component={"div"}
                            icon={
                                <RadioButton 
                                    checked={isSubscibe}
                                />
                            }
                            noBorder
                        >
                            <div className="content">
                                <div className="title">
                                    Subscribe                                
                                </div>       
                                <div className="off">
                                    <CuttedLabel
                                        noStart
                                        bgColor={
                                            isSubscibe ? (
                                                "white"
                                            ) : (
                                                DEFAULT_THEME_COLORS.UltraLightGray
                                            )
                                        }
                                        style={{
                                            backgroundColor: subOfPrice ? labelBG : DEFAULT_THEME_COLORS.Green
                                        }}
                                    >
                                        {subOfPrice ? (
                                            <>
                                                save {subscribeOff.isPercent ? (
                                                    `${subscribeOff.value}%`
                                                ) : (
                                                    currencify(subscribeOff.value)
                                                )}
                                            </>
                                        ) : (
                                            "SAVE 100%"
                                        )}
                                    </CuttedLabel>
                                </div>
                                {(subOfPrice > 0) && (
                                    <div className="price">
                                        {currencify(subOfPrice)}
                                    </div>                     
                                )}
                            </div>
                        </CustomListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={cn(
                            "panel-body",
                            "subscribe"
                        )}
                    >
                        <div className="quantity">
                            <NumberSelect
                                className="number-select"
                                onDecrement={handleDecrementSubscribeCount}
                                onIncrement={handleIncrementSubscribeCount}
                                value={subscribeCount}
                                decDisabled={subscribeCount === 1}
                                incDisabled={subscribeCount === maxSubscribe}
                                theme="light-gray"
                            />
                        </div>
                        <Button
                            containerProps={{
                                className: "button-container"
                            }}
                            block
                            onClick={handleSubscribe}
                        >
                            Set Up Now
                        </Button>
                        <div 
                            className="delivery-settings"
                            style={{
                                height: showDeliverySettings ? "140px" : "0"
                            }}
                        >
                            <TimePicker 
                                className="time-picker"
                                format="HH:mm"
                                value={time}
                                onChange={handleTimeSelect}
                                disabledHours={() => disabledHours}
                                hideDisabledOptions
                            />
                            <Select
                                className="select"
                                onChange={e => setDeliveryDay(e.target.value)}
                                value={deliveryDay}
                            >
                                <MenuItem 
                                    value='default'
                                    disabled
                                >
                                    Delivery Day
                                </MenuItem>
                                {subscribeDeliveryDays.map(
                                    (day, index) => (
                                        <MenuItem 
                                            key={index}
                                            value={day.value}
                                        >
                                            {day.text}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                            <Select
                                className="select"
                                onChange={handleDeliverEveryChange}
                                value={deliverEvery}
                            >
                                <MenuItem 
                                    value="default"
                                    disabled
                                >
                                    Deliver Every...
                                </MenuItem>
                                {deliveryFreqs.map(
                                    (count, index) => (
                                        <MenuItem 
                                            key={index}
                                            value={count}
                                        >
                                            {count} {deliverEveryData.label}{(count > 1) && 's'}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </div>
                        <Grid 
                            className="show-settings"
                            container
                            justify="space-between"
                            alignItems="center"
                            onClick={toggleShowDeliverySettings}
                        >
                            <SettingsIcon 
                                className="icon"
                                style={{
                                    transform: showDeliverySettings ? "rotate(360deg)" : ""
                                }}
                            />
                            <span>
                                Delivery Preffrences
                            </span>
                            <ExpandMoreIcon 
                                className="icon"
                                style={{
                                    transform: showDeliverySettings ? "rotate(180deg)" : ""
                                }}
                            />
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
            <div className="panel-bottom">
                <span className="by">
                    By 
                    {" "}
                    <span 
                        className="highlight"
                        style={{
                            color: manufacturer.color
                        }}
                    >
                        {manufacturer.title}
                    </span>
                </span>
                <br />
                <Button
                    containerProps={{
                        className: "button-container"
                    }}
                    size='small'
                    theme="darkOutline"
                    onClick={onFav}
                >
                    {(isFav && isLoggedIn) ? (
                        "Remove From Wish List"
                    ) : (
                        <>
                            <FavoriteBorderIcon />
                            {" "}
                            Add To Wish List 
                        </>
                    )}                                    
                </Button>
            </div>     
            {noAddToCart && (
                <BottomFixedContainer className="submit" >
                    <Button
                        containerProps={{
                            className: "button-container"
                        }}
                        onClick={() => addToCart(false)}
                    >
                        
                        <Badge
                            classes={{
                                badge: "badge"
                            }}
                            badgeContent={addCount}
                            max={1000}
                        >
                            Add To Cart
                        </Badge>
                    </Button>
                    <Button
                        containerProps={{
                            className: "button-container"
                        }}
                        theme="gray"
                        onClick={scrollToRoot}
                    >
                        More Options
                    </Button>
                </BottomFixedContainer>     
            )}  
        </div>
    );
}



const correctDate = ({
    deliveryDay, 
    nowFormatted, 
    startDeliveryTime, 
    endDeliveryTime,    
}) => {
    

    const out = {
        hour: nowFormatted.hour,
        minute: nowFormatted.minute
    }

    if(isAfter(out, startDeliveryTime) || (deliveryDay !== nowFormatted.weekDayIndex)){
        out.hour = startDeliveryTime.hour;
        out.minute = startDeliveryTime.minute;
    }

    return roundTime({
        hour: parseInt(out.hour),
        minute: parseInt(out.minute)
    });
};


const isAfter = (time1, time2) => {
    if(
        (
            parseInt(time2.hour) > parseInt(time1.hour)
        ) ||
        (
            (
                parseInt(time2.hour) === parseInt(time1.hour)
            ) &&
            (
                parseInt(time2.minute) > parseInt(time1.minute)
            )
        )
    ){
        return true;
    }

    return false;
}


const roundTime = time => {
    const out = {...time};

    if(time.minute % 30){
        if(time.minute > 30){
            out.hour = (time.hour === 23) ? 0 : (time.hour + 1);
            out.minute = 0
        } else {
            out.hour = time.hour;
            out.minute = 30
        }
    }

    return out;
}

const getStartDay = weekDayIndex => {
    if(checkIfDayExists(weekDayIndex)){
        return weekDayIndex;
    }

    for(let i = 1; i < 7; i++){
        if(checkIfDayExists((weekDayIndex + i) % 7)){
            return (weekDayIndex + i) % 7;
        }
    }
}


const checkIfDayExists = dayIndex => subscribeDeliveryDays.findIndex(
        day => day.value === dayIndex
) !== -1;


const getInitialTime = ({
    todayIndex, 
    initialDayIndex, 
    roundedNow, 
    startDeliveryTime
}) => { 
    if(todayIndex === initialDayIndex){
        return `${roundedNow.hour}:${roundedNow.minute}`
    }

    return `${startDeliveryTime.hour}:${startDeliveryTime.minute}`
}

function renderSkeleton({
    classes,
    noAddToCart,
    className
}){

    const buttonStyle = {
        borderRadius:"30px",
        margin: "15px 0",
        display: "inline-block"
    }    

    return (        
        <div 
            className={cn(
                'order-method-l2',
                className
            )}
        >
            <ExpansionPanel
                className={cn(
                    "panel",
                    "selected"
                )}
                square 
                expanded
            >
                <ExpansionPanelSummary
                    className="panel-header"
                    classes={classes}
                >
                    <CustomListItem                        
                        noIcon
                        noBorder
                    >
                        <div className="content">                            
                            <div className="title">
                                <Skeleton
                                    variant="text" 
                                    width="70px" 
                                />
                            </div>       
                            <div className="price">
                                <Skeleton
                                    variant="text" 
                                    width="40px" 
                                />
                            </div> 
                        </div>
                    </CustomListItem>
                </ExpansionPanelSummary>
                <div
                    className="panel-body"
                    style={{
                        padding: "10px"
                    }}
                >
                    <div className="want-it">
                        <Skeleton
                            variant="text" 
                            width="180px" 
                        />
                        <Skeleton
                            variant="text" 
                            width="180px" 
                        />
                    </div>
                    <div className="quantity">
                        <Skeleton
                            style={buttonStyle}
                            variant="rect" 
                            width="100%" 
                            height="50px"
                        />
                    </div>
                    {!noAddToCart && (
                        <Skeleton
                            style={buttonStyle}
                            variant="rect" 
                            width="100%" 
                            height="50px"
                        />
                    )}
                    <Skeleton
                        style={buttonStyle}
                        variant="rect" 
                        width="100%" 
                        height="50px"
                    />
                </div>
            </ExpansionPanel>            
            <div className="panel-bottom">
                <Skeleton
                    style={{
                        ...buttonStyle,
                        margin: "0"
                    }}
                    variant="text" 
                    width="90px" 
                />
                <br />
                <Skeleton
                    style={{
                        ...buttonStyle,
                        margin: "0"
                    }}
                    variant="rect" 
                    width="180px" 
                    height="30px"
                />
            </div>     
            {noAddToCart && (
                <BottomFixedContainer className="submit" >
                    <Skeleton
                        style={{
                            ...buttonStyle,
                            margin: "0 5px"
                        }}
                        variant="rect" 
                        width="100%" 
                        height="50px"
                    />
                    <Skeleton
                        style={{
                            ...buttonStyle,
                            margin: "0 5px"
                        }}
                        variant="rect" 
                        width="100%" 
                        height="50px"
                    />
                </BottomFixedContainer>     
            )}
        </div>
    );
}