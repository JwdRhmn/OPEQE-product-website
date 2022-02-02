import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Timer from '@material-ui/icons/Timer';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Skeleton from '@material-ui/lab/Skeleton';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import useTimer from "../../hooks/useTimer/";

import ItemImage from "../ItemImage";

import useBreakpoint from "../../hooks/useBreakpoint/";

import currencify from "../../../functions/currencify";

export default function(props) {
	const { 
        className, 
        style,
        layoutProps={},
        hideFav,
        isFav,
        image,
        infoBarClass,
        label,
        title,
        href,
        subTitle,
        categories=[],
        timeRemaining,
        subTitleHref,
        categoryHrefs=[],
        onExpired,
        onFav,
        timeEstimate,
        deliveryFee,
        price,
        id,
        onLabelClick,
        skeleton,
        bottomLabel,
        ...others
    } = props;

    const currentBreakpoint = useBreakpoint();

    const { seconds: remainingSeconds, getFormatted } = useTimer({
        from: timeRemaining,
    });

    function formatCountDown(){
        const { hours, minutes, seconds} = getFormatted(remainingSeconds, { days: false });
        let str = ''
        str += `${hours < 10 ? '0' : ''}${hours === 0 ? '0' : hours}`;
        str += ` : ${minutes < 10 ? '0' : ''}${minutes === 0 ? '0' : minutes}`;
        str += `: ${seconds < 10 ? '0' : ''}${seconds === 0 ? '0' : seconds}`;

        return str;
    }

    function handleFav(){
        onFav(id, !isFav);
    }

    let imageStyles = {
        borderRadius: layoutProps.imageRadius,
    };
    if(layoutProps.imageHeight){
        imageStyles.height = layoutProps.imageHeight[currentBreakpoint];
    } else {
        imageStyles.paddingTop = layoutProps.aspectRatio;
    }    
    const rootStyles = {
        boxShadow: layoutProps.shadow,
    }
    const infoStyles = {
        height: layoutProps.infoBarHeight,
    }

    if(skeleton){
        return renderSkeleton({
            imageStyles,
            rootStyles,
            infoStyles
        });
    }


    return (
        <Grid 
        	className={cn(
        		'food-card-l1',
        		className,
        	)} 
        	style={{
                ...rootStyles,
                ...style 
            }}     
            container
            direction="column"
            {...others}       
        >
            <div 
                className="image"
                style={{
                    ...imageStyles
                }}
            >
                <Link to={href} >
                    <ItemImage src={image} alt={title} />
                </Link>
                {label &&
                    <span 
                        className={cn(
                            "label",
                            {"animated-hide": timeRemaining && !remainingSeconds}
                        )}
                        onClick={onLabelClick}
                    >
                        {label}
                    </span>
                }
                {!hideFav && (
                        <IconButton className="fav" onClick={handleFav}>
                            {isFav ? (
                                <Favorite className="icon" />
                            ) : (
                                <FavoriteBorder className="icon" />
                            )}
                        </IconButton>
                )}
                {timeRemaining > 0 && 
                    <span 
                        className={cn(
                            "timer",
                            {"expired": !remainingSeconds},
                            {"animated-hide": !remainingSeconds}
                        )}
                    >
                        <AccessAlarmIcon className="icon" />
                        {remainingSeconds ? formatCountDown() : 'Expired'}
                    </span>
                }
            </div>
            <Grid 
                className={cn(
                    'info',
                    infoBarClass,
                )}
                style={infoStyles}
                container
                direction="column"
                justify="space-between"
            >
                <div className="title">
                    {title}
                </div>
                <div className="sub-title">
                    <Link className="main" to={subTitleHref}>
                        {subTitle}
                    </Link>
                    {categories.map( (category, index) => 
                        <Link key={index} className="sub" to={categoryHrefs[index]}>
                            {category.text}
                        </Link>
                    )}
                </div>
                <Grid container justify="space-between" className="extra">
                    <span>
                        {(timeEstimate && timeEstimate.length) &&
                            <span className="tag light">
                                <Timer className="icon"/> 
                                {timeEstimate.length && timeEstimate.join('-')} Mins
                            </span>
                        }
                        <span className="tag dark">
                            {currencify(price)}
                        </span>
                    </span>
                    
                    <span className="tag green light">
                        {bottomLabel}
                    </span>
                </Grid>
            </Grid>
        </Grid>
    );
}




function renderSkeleton({
    imageStyles,
    rootStyles,
    infoStyles
}){
    const textStyle = {
        margin: '2px 0',
    }

    return ( 
        <div 
            className={cn(
                'food-card-l1',
                {'shadow': true},
            )}      
            style={rootStyles}  
        >      
            <div 
                style={imageStyles}
                className="image"
            >
                <Skeleton component="img" variant="rect" width={'100%'}/>
            </div>        
            <Grid 
                className='info'
                style={infoStyles}  
                container
                direction="column"
                justify="space-between"
            >
                <Skeleton style={textStyle} className="title" variant="text" width={'100%'}/>
                <div className="sub-title">
                    <Skeleton style={textStyle} className="main" variant="text" width={'90%'}/>
                </div>
                <Grid container justify="space-between" className="extra">
                    <Skeleton style={textStyle} component="span" variant="text" width={'90px'}/>
                    <Skeleton style={textStyle} component="span" variant="text" width={'110px'}/>
                </Grid>
            </Grid>
        </div>
    );
}