import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cn from "classnames";

import CustomInput from '../../materialPro/components/CustomInput/CustomInput.jsx';

function Main(props, ref) {
    const { className=[], fieldClassName, regex=/^[0-9]+$/, onChange, disabled } = props;

    const initialDigits = ['', '', '', ''];
    const [ digits, setDigits ] = useState(initialDigits);

    const inputRefs = [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ]

    useImperativeHandle(ref, () => ({
      clear: clear,
    }));

    function _digitChange(event, index){
      const value = event.target.value

      if(!regex.test(value)){
        return;
      }

      const newDigits = [...digits];      
      newDigits[index] = getNewChar(digits[index], value);
      change(newDigits);

      if(index < (inputRefs.length - 1)){
        inputRefs[index + 1].current.focus();
      }
    }

    function _keyDown(event, index){
      const keyCode = event.which || event.keyCode; 
      if(keyCode === 8){
        const newDigits = [...digits];      
        newDigits[index] = '';
        change(newDigits);

        if(index > 0){
          inputRefs[index - 1].current.focus();
        }
      }
    }

    function clear(){
      change(initialDigits);
    }


    function change(newDigits){
      setDigits(newDigits);
      if(onChange){
        onChange(newDigits);
      }
    }

    return (
        <div 
          className={cn(
            "code-input-l1",
            className
          )}
          dir='ltr'
        >          
            <CustomInput 
              inputProps={{
                className:fieldClassName,
                type: "tel",
                placeholder: "x",
                value: digits[0],
                onChange: event => _digitChange(event, 0),
                onKeyDown: event => _keyDown(event, 0),
                inputRef: inputRefs[0],
                disabled,
              }}
            />
            <CustomInput 
              inputProps={{
                className:fieldClassName,
                type: "tel",
                placeholder: "x",
                value: digits[1],
                onChange: event => _digitChange(event, 1),
                onKeyDown: event => _keyDown(event, 1),
                inputRef: inputRefs[1],
                disabled,
              }}
            />
            <CustomInput 
              inputProps={{
                className:fieldClassName,
                type: "tel",
                placeholder: "x",
                value: digits[2],
                onChange: event => _digitChange(event, 2),
                onKeyDown: event => _keyDown(event, 2),
                inputRef: inputRefs[2],
                disabled,
              }}
            />
            <CustomInput 
              inputProps={{
                className:fieldClassName,
                type: "tel",
                placeholder: "x",
                value: digits[3],
                onChange: event => _digitChange(event, 3),
                onKeyDown: event => _keyDown(event, 3),
                inputRef: inputRefs[3],
                disabled,
              }}
            />
        </div>
    );
}




function getNewChar(prevStr, newStr){  
  if(prevStr === newStr[0]){
    return newStr[1];
  } else {
    return newStr[0];
  }
}



export default forwardRef(Main);