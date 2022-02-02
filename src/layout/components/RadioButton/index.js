import React from 'react';
import cn from "classnames";

import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

import setColorAlpha from "../../../functions/setColorAlpha";

import { DEFAULT_THEME_COLORS } from "../../config/layout";

const useStyles =  makeStyles({
  control: props => ({
    color: `${props.color}`,
    '&:hover': {
       background: `${props.hoverBG}`,
    },
  }),
});

export default function(props) {
    const { 
        className, 
        style:{
            color=DEFAULT_THEME_COLORS.Main,
            ...style
        }={},
        skeleton,
        disabled,
        ...others
    } = props;

    const classes = useStyles({
        color: color,
        hoverBG: setColorAlpha(color, 0.15),
    });


    return (
        <Radio 
            className={cn(
                'radio-button-l1',
                'control',
                classes.control,
                className
            )} 
            style={{
                ...style 
            }}
            color="default"
            disabled={skeleton || disabled}
            {...others}
        />
    );
}


