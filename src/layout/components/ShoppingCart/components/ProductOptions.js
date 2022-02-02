import React from 'react';
import cn from "classnames";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";

import ItemReceipt from "../../ItemReceipt";
import CustomListItem from "../../CustomListItem";
import CustomListTextField from "../../CustomListTextField";

export default function(props) {
	const { 
        className, 
        style,
        onFav,
        onDel,
        items,
        onNoteChange,
        onInc,
        onDec,
        ...others
    } = props;

    return (
        <div 
        	className={cn(
        		'product-options-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <ItemReceipt 
                items={items}
                onFav={onFav}
                onDel={onDel}
                onInc={onInc}
                onDec={onDec}
                noItemsText="Your Cart Is Empty"
            />
            <List className="others">               
                <CustomListTextField
                    max={20}
                    textProps={{
                        placeholder: "Add Option (Extra napkins, chapsticks, ...)",
                    }}
                    onChange={onNoteChange}
                    noIcon
                >
                    <TextField/> 
                </CustomListTextField>
                <CustomListItem
                    className="add-more green"
                    noIcon
                    button
                    component={RouterLink}
                    to='/'
                >
                     Add more items
                </CustomListItem>       
                <CustomListTextField
                    textProps={{
                        placeholder: "Add Promo Code",
                    }}
                    noIcon
                >
                    <TextField/> 
                </CustomListTextField>       
            </List>           
        </div>
    );
}