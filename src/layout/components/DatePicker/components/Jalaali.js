import React from 'react';
import 'date-fns';

import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';

import "moment/locale/ar-sa";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });



export default function MaterialUIPickers({
    className,
    style,
    providerProps,
    ...others
}) {

  return (    
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">                
        <DatePicker
            {...others}
        />                
    </MuiPickersUtilsProvider>                
  );
}
    
