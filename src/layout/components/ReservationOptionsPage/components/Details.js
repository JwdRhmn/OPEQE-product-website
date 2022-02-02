import React, { useState } from 'react';
import cn from "classnames";
import { Redirect } from "react-router-dom";

import {
    RESERVATION_OPTIONS_PAGE_URL
} from "../../../config/routing";

import CustomListTextField from "./CustomListTextField";
import CustomListItem from "./CustomListItem";

import Button from "../../DefaultButton";
import Select from "../../CustomSelect";
import NumberSelect from "../../NumberSelect";
import BottomFixedContainer from "../../BottomFixedContainer";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import EditIcon from '@material-ui/icons/Edit';
import CakeIcon from '@material-ui/icons/CakeTwoTone';
import MenuItem from '@material-ui/core/MenuItem';



export default function(props) {
	const {  
        className, 
        style,
        count,
        max,
        disabled,
        time,
        date,  
        onDone, 
        showNumberSelect,
        redirectToBase,
        occasions=[],   
        loading, 
        noWaitlist,
        isMobile,
        ...others
    } = props;

    

    const [ occasion, setOccasion ] = useState('default');
    const [ specialRequest, setSpecialRequest ] = useState('');

    const [ localCount, setLocalCount ] = useState(2);
    function increment(){
        if(max && localCount === max){
            return;
        }
        setLocalCount(localCount + 1);
    }

    function decrement(){
        if(localCount === 1){
            return;
        }
        setLocalCount(localCount - 1);
    }



    function handleDone(){
        if(onDone){
            onDone({
                occasion, 
                specialRequest,
                count: finalCount,
            });
        }
    }


    const finalCount = showNumberSelect ? localCount : count;

    if(redirectToBase || (showNumberSelect && noWaitlist)){
      return <Redirect to={`/${RESERVATION_OPTIONS_PAGE_URL()}`} />;
    }

    return (
        <div 
        	style={{
                ...style 
            }}
            className={cn(
                "details-l2",
                {"mobile": isMobile},
                className,
            )}            
            {...others}
        >           
            <List> 
                <CustomListItem noIcon>
                    Almost done !
                </CustomListItem>         
                <CustomListItem
                    icon={TodayIcon}
                >
                    {date}
                </CustomListItem>
                <CustomListItem
                    icon={AlarmOnIcon}
                >
                    {time}
                </CustomListItem>
                <CustomListItem
                    icon={PeopleIcon}
                >
                    {finalCount} People
                </CustomListItem>
                <CustomListItem
                    icon={CakeIcon}
                >
                    <Select
                        onChange={e => setOccasion(e.target.value)}
                        value={occasion}
                    >
                        <MenuItem value='default'>
                            Select an occasion (optional)
                        </MenuItem>
                        {occasions.map(
                            (item, index) => (
                                <MenuItem 
                                    key={index}
                                    value={item.value}
                                >
                                    {item.text}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </CustomListItem>
                <CustomListTextField 
                    textProps={{
                        placeholder: "Special request (optional)",
                    }}
                    icon={EditIcon}
                    value={specialRequest}
                    onChange={ e => setSpecialRequest(e.target.value)}
                />
            </List> 
            <Grid 
                className="buttons"
                container
                justify="center"
                alignItems="center"
            >
                <BottomFixedContainer>
                    {showNumberSelect && (
                        <NumberSelect 
                            onDecrement={decrement}
                            onIncrement={increment}
                            value={localCount}
                            decDisabled={localCount === 1}
                            incDisabled={localCount === max}
                        />
                    )}
                    <Button 
                        containerProps={{
                            className: 'add',
                        }}
                        disabled={disabled}
                        onClick={handleDone}
                        block={!showNumberSelect}
                        width={!showNumberSelect && "100%"}
                        waiting={loading}
                    >
                        Done
                    </Button>
                </BottomFixedContainer>
            </Grid>            
        </div>
    );
}