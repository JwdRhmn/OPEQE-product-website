import React  from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function() {
        
        const theme = useTheme();
        
        const options = {
            noSsr: true,
        }
        
        const matches = {
            xs: useMediaQuery(theme.breakpoints.up('xs'), options),
            sm: useMediaQuery(theme.breakpoints.up('sm'), options),
            md: useMediaQuery(theme.breakpoints.up('md'), options),
            lg: useMediaQuery(theme.breakpoints.up('lg'), options),
            xl: useMediaQuery(theme.breakpoints.up('xl'), options),
        };

                   
        let current;
        for(const key in matches){
            if(matches[key]){
                current = key;
            }
        }

        return current;
}

