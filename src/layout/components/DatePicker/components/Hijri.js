import React from 'react';
import 'date-fns';

import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';

import "moment/locale/ar-sa";
import jMoment from "moment-jalaali";
import HijriUtils from "@date-io/hijri";


jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });


export default function MaterialUIPickers({
    className,
    style,
    providerProps,
    ...others
}) {

  return (    
    <MuiPickersUtilsProvider  utils={HijriUtils} locale="ar-SA">                
        <DatePicker
            {...others}
        />                
    </MuiPickersUtilsProvider>                
  ); 
}
    
