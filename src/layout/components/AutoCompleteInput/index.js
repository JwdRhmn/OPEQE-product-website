import React from 'react';
import cn from "classnames";

import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CustomInput from '../../materialPro/components/CustomInput/CustomInput.jsx';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function(props) {
  const {
    className,
    style,
    itemClassName,
    listContainerClassName,
    inputFormClassName,
    inputClassName,
    addInputProps,
    addLabelProps,
    addWrapperProps,
    placeholder,
    labelText,
    ItemIcon,
    inputRef,
    suggestions=[],
    getSuggestions,
    AdornmentIcon,
    ...others
  } = props;



  return (
      <Downshift {...others} >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: placeholder,
          });

          return (
            <div 
                className={cn(
                    'auto-complete-input-l1',
                    className,
                )} 
                style={{
                    ...style
                }}   
                {...addWrapperProps}
            >                             
              <CustomInput                         
                formControlProps={{
                  className:cn(
                    "input",
                    inputFormClassName,
                  ),
                }}
                inputProps={{
                    inputRef: inputRef,                   
                    onBlur, 
                    onFocus,                    
                    startAdornment:(AdornmentIcon && 
                        <InputAdornment className="adornmrnt" position="start">
                          {AdornmentIcon}
                        </InputAdornment>
                    ),
                    ...inputProps,
                    ...addInputProps,    
                }}
                labelText={labelText}
                labelProps={{
                    ...getLabelProps({ shrink: true }),
                    ...addLabelProps,
                }}
              />

              <div 
                className={cn(
                  "list-container",
                  listContainerClassName,
                )}
                {...getMenuProps()}
              >
                {isOpen ? (
                  <Paper square>
                    {(getSuggestions ? 
                            getSuggestions(suggestions, inputValue) 
                        : 
                            suggestions
                        ).map((suggestion, index) => {

                        const isHighlighted = highlightedIndex === index;
                        const isSelected = (selectedItem ? selectedItem.key : '').indexOf(suggestion.key) > -1;
                        const itemProps = getItemProps({ item: suggestion });

                        return (
                            <ListItem
                              className={cn(
                                itemClassName
                              )}
                              {...itemProps}
                              key={suggestion.key}
                              selected={isHighlighted}
                              component="div"
                              style={{
                                fontWeight: isSelected ? 500 : 400,
                              }}
                            >
                              {ItemIcon && 
                                <ListItemIcon>
                                    {ItemIcon}
                                </ListItemIcon>
                              }
                              {suggestion.text}
                            </ListItem>
                        );
                    })}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
  );
}