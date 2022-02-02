import React from 'react';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import "moment/locale/ar-sa";

export default function MaterialUIPickers({
    className,
    style,
    providerProps,
    ...others
}) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>                
        <DatePicker
            {...others}
        />                
    </MuiPickersUtilsProvider>                        
  );
}
    
