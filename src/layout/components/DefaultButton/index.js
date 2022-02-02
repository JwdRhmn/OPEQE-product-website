import React from 'react';
import cn from "classnames";

import { DEFAULT_THEME_COLORS } from "../../config/layout";

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../materialPro/components/CustomButtons/Button';

export default function(props) {
	const {  
        className, 
        style, 
        children, 
        waiting=null,
        theme='dark',
        colorTheme,
        width,
        fontSize,
        color,
        bgColor,
        type='button',
        margin,
        onClick,
        block,
        containerProps={},
        size="large",
        ...others
    } = props;

    return (
        <div
            {...containerProps}
            className={cn(
                'default-button-l1',
                size,
                colorTheme && `color-${colorTheme}`,
                containerProps.className,                
            )} 
            style={{
                width: width && width,
                fontSize: fontSize && fontSize,
                margin: margin,
                display: block && 'block',                
                ...(containerProps.style && containerProps.style),
            }}            
        >
            <Button      	
                round   
                type={type}
                onClick={onClick}
                className={cn(                    
                    {'start-waiting': (waiting === true)},
                    {'stop-waiting': (waiting === false)},
                    className,
                )} 
                style={{     
                    ...getThemeStyles(theme),          
                    ...style,
                }}
                {...others}
            >
                {waiting ? 
                    <CircularProgress 
                        className="proggress"
                    />
                :
                    children
                }
            </Button> 
        </div>
    );
}




const getThemeStyles = theme => {
    switch(theme){
        case 'dark': {
            return {
                backgroundColor: DEFAULT_THEME_COLORS.Complementary,
                color: DEFAULT_THEME_COLORS.UltraLightGray,
                borderColor: DEFAULT_THEME_COLORS.Complementary,
            }
        }
        case 'darkOutline': {
            return {
                backgroundColor: 'transparent',  
                color: DEFAULT_THEME_COLORS.Complementary,
                borderColor: DEFAULT_THEME_COLORS.Complementary,
            }
        }
        case 'grayOutline': {
            return {
                backgroundColor: 'transparent',  
                color: DEFAULT_THEME_COLORS.MediumGray,
                borderColor: DEFAULT_THEME_COLORS.MediumGray,
            }
        }
        case 'gray': {
            return {
                backgroundColor: DEFAULT_THEME_COLORS.DarkGray,
                color: 'white',
                borderColor: DEFAULT_THEME_COLORS.MediumGray,
            }
        }
        case 'light-gray': {
            return {
                backgroundColor: DEFAULT_THEME_COLORS.MediumLightGray,
                color: DEFAULT_THEME_COLORS.Main,
                borderColor: DEFAULT_THEME_COLORS.MediumLightGray,
            }
        }
        case 'light': {
            return {
                backgroundColor: 'transparent',      
                color: DEFAULT_THEME_COLORS.Main,
                borderColor: DEFAULT_THEME_COLORS.Main,
            }
        }
        case 'green': {
            return {
                backgroundColor: DEFAULT_THEME_COLORS.Main,      
                color: DEFAULT_THEME_COLORS.UltraLightGray,
                borderColor: DEFAULT_THEME_COLORS.Main,          
            }
        }
    }
}