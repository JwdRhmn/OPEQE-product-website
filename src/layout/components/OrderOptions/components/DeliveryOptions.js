import React, { useState, memo } from 'react';
import cn from "classnames";

import List from "@material-ui/core/List";
import DoneIcon from "@material-ui/icons/Done";
import HomeIcon from "@material-ui/icons/Home";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NearMeIcon from "@material-ui/icons/NearMe";

import CustomListItem from "./CustomListItem";

import Button from '../../DefaultButton';
import CircularProgress from "../../CircularProgress";
import AddressAutoComplete from "../../AddressAutoComplete";
import BottomFixedContainer from '../../BottomFixedContainer';


import useGeoToAddress from "../../../hooks/useGeoToAddress";

export function Index(props) {
	const {  
        className, 
        style,
        breakpoints,
        onDone,
        onNext,
        address,
        loading,
        onScheduleClick,
        mode,
        onScheduleIgnore,
        schedule,
        isScheduled,
        noDelivey,
        isMobile,
        ...others
    } = props;

    const [ how, setHow ] = useState( mode );

    const {
      getAddresses,
      loading: loadingAddresses,
    } = useGeoToAddress();

    function handleAddressData(results){
        if(!results.length){
            return;
        }
        if(onNext){
            onNext(results[0]);
        }
    }

    function findAddress(){
      getAddresses(findAddressSuccess, findAddressError);
    }

    function findAddressSuccess(results){
        if(!results.length){
            return;
        }
        if(onNext){
            onNext(results[0]);
        }
    }

    function findAddressError(error){
      
    }
    

    const handleDone = () => {
        onDone(how);
    }

    const deliveryMode = Boolean(address) && Boolean(address.deliverToDoor) ? (
        'Deliver to door' 
    ) : (
        'Pickup outside'
    );

    return (
        <div 
        	className={cn(
        		"delivery-options-l2",
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            {!noDelivey && (
                <>
                    <AddressAutoComplete 
                        className="auto-complete"
                        placeholder="Enter new address"
                        onData={handleAddressData}
                    />

                    <List className="current-location">              
                        <CustomListItem                     
                            primaryText="Use current loaction"
                            PrimaryIcon={ 
                                (
                                  loadingAddresses                         
                                ) ?
                                    <CircularProgress className="spinner" size={20} />
                                :
                                    <NearMeIcon />
                            }
                            onClick={findAddress}
                            button
                        />
                    </List>   
                    <List className="locations">                              
                        {Boolean(address) &&
                            <CustomListItem 
                                primaryText={address.title}
                                secondaryText={address.locationName}
                                teritaryText={deliveryMode}
                                PrimaryIcon={<HomeIcon className="icon"/>}
                                SecondaryIcon={<DoneIcon  className="icon green"/>}
                                button
                            />
                        }
                    </List>
                    <div className="list-header">
                        How
                    </div>
                    <div className="how">
                        <RadioGroup
                          className="radio-group"
                          value={how}
                          onChange={event => setHow(event.target.value)}
                        >
                            <FormControlLabel  
                                value="delivery" 
                                control={<Radio className="radio" />} 
                                label="Delivery" 
                            />
                            <FormControlLabel  
                                value="pickup" 
                                control={<Radio className="radio" />} 
                                label="Free Pickup In Store" 
                            />
                        </RadioGroup>
                    </div>
                </>
            )}
            <div className="list-header">
                When
            </div>
            <List className="when">              
                <CustomListItem 
                    primaryText="As Soon As Possible"
                    PrimaryIcon={<AccessAlarmsIcon  className="icon"/>}
                    SecondaryIcon={<DoneIcon  className="icon green"/>} 
                    button
                    hideSecondaryIcon={isScheduled}
                    onClick={onScheduleIgnore}
                />
                <CustomListItem 
                    primaryText={isScheduled ? (
                            `${
                                schedule.monthName.substr(0, 3)
                            } ${
                                schedule.day
                            }, ${
                                schedule.year
                            } ${
                                schedule.hour
                            }:${
                                schedule.minute
                            } ${
                                schedule.meridiem
                            }`
                        ) : (
                            "Schedule"
                        )
                    }
                    PrimaryIcon={<CalendarTodayIcon  className="icon"/>}
                    SecondaryIcon={isScheduled ? (
                            <DoneIcon  className="icon green"/>
                        ) : (
                            <KeyboardArrowDownIcon  className="icon gray" />
                        )
                    }                                 
                    button
                    onClick={onScheduleClick}
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
    return prev.onDone === next.onDone;;
})