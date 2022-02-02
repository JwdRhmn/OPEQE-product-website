import React, { useState, memo } from 'react';
import cn from "classnames";
import { Redirect } from "react-router-dom";
import produce from "immer";

import List from "@material-ui/core/List";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import DoneIcon from "@material-ui/icons/Done";


import CustomListTextField from "../../CustomListTextField";
import CustomListItem from "./CustomListItem";
import Button from '../../DefaultButton';
import BottomFixedContainer from '../../BottomFixedContainer';

export function Index(props) {
	const {  
        className, 
        style,
        onDone,
        loading,
        noDelivey,
        basePath,
        isMobile,
        breakpoints,
        ...others
    } = props;

    const [ mode, setMode ] = useState('deliver');

    const [ notes, setNotes ] = useState({
        apt: '',
        business: '',
        delivery: '',
    });

    const handleNotes = key => event => {
        const value = event.target.value;
        setNotes( produce(newNotes => {
            newNotes[key] = value;
        }));
    }

    const handleDone = () => {
        onDone({
            mode: mode,
            notes: notes,
        });
    }

    if(noDelivey){
        return (
            <Redirect to={basePath} />
        )
    }

    return (
        <div 
        	className={cn(
        		'address-options-l2',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="list-header">
                Delivery Options
            </div>
            <List className="delivery">              
                <CustomListItem 
                    primaryText="Deliver to door"
                    PrimaryIcon={<TouchAppIcon  className="icon" />}
                    SecondaryIcon={<DoneIcon  className="icon green" />} 
                    button
                    hideSecondaryIcon={mode !== 'deliver'}
                    onClick={() => setMode('deliver')}
                />
                <CustomListTextField 
                    textProps={{
                        placeholder: "Apt, Suit, Floor",
                    }}
                    value={notes.apt}
                    onChange={handleNotes('apt')}
                    noBorder
                    noIcon
                />
                <CustomListTextField 
                    textProps={{
                        placeholder: "Business name",
                    }}
                    value={notes.business}
                    onChange={handleNotes('business')}
                    noBorder
                    noIcon
                />
                <CustomListItem 
                    primaryText="Pickup outside"
                    PrimaryIcon={<NaturePeopleIcon className="icon"/>}
                    SecondaryIcon={<DoneIcon  className="icon green"/>}                                 
                    button
                    hideSecondaryIcon={mode !== 'pickup'}
                    onClick={() => setMode('pickup')}
                />
                <CustomListTextField 
                    textProps={{
                        placeholder: "Delivery note",
                    }}
                    value={notes.delivery}
                    onChange={handleNotes('delivery')}
                    noBorder
                    noIcon
                />
            </List>
            <BottomFixedContainer breakpoints={breakpoints}>
                <Button 
                    className='done-button'
                    width="100%"
                    waiting={loading} 
                    onClick={handleDone}
                    block
                >
                    Done
                </Button> 
            </BottomFixedContainer>
        </div>
    );
}





export default memo(Index, (prev, next) =>{
    return prev.onDone === next.onDone;
})