import React, { useState } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import { Route, Redirect } from 'react-router-dom';
import AnimatedSwitch from "../AnimatedSwitch";

import {
  HOME_PAGE_URL,
  ORDER_OPTIONS_PAGE_URL,
} from "../../config/routing";

import {
  storeDeliveryTimeRange,
  noDeliverySupport,
} from "../../config/store";

import Grid from '@material-ui/core/Grid';

import DeliveryOptions from "./components/DeliveryOptions";
import AddressOptions from "./components/AddressOptions";
import ScheduleButtons from "./components/ScheduleButtons";

import Schedule from "../Schedule";
import CircularProgress from '../CircularProgress';

import getUserDefaultAddress from "../../../store/selectors/user/getUserDefaultAddress";
import setUserDefaultAddress from "../../../store/actions/user/setUserDefaultAddress";
import setDeliveryCondition from "../../../store/actions/user/setDeliveryCondition";
import getUserDeliveryCondition from "../../../store/selectors/user/getUserDeliveryCondition";

import getAddressComponents from "../../../functions/getAddressComponents";
import isMobile from "../../../functions/isMobile";

import useGoogleMaps from "../../hooks/useGoogleMaps";


export function Index(props) {
    const {  
        className, 
        style,
        defaultAddress,
        setUserDefaultAddress,
        setDeliveryCondition,
        deliveryCondition: {
          type: {
            code: typeCode,
          },
          schedule,
        },
        breakpoints,
        history,
        location,
        onClose,
        ...others
    } = props;
    
    const [ delivery, setDelivery ] = useState(null);  
    const [ scheduled, setScheduled ] = useState(schedule);  
    const [ addressData, setAddressData ] = useState(null);


    const { loading: loadingAPI } = useGoogleMaps();    


    const tmpAddress = addressData ? (
      {
        ...getAddressComponents( addressData.address_components ),
        title: 'Home', //?
      }
    ) : (
      defaultAddress
    );

    function addressOptionsDone(data){
      setDelivery(data);      
      history.push(basePath);
    }

    function scheduleDone(data){
      setScheduled(data);
      history.push(basePath);
    }

    function deliveryOptionsDone(how){      
      returnToOrigin();
      
      setDeliveryCondition({
        type: how,
        schedule: scheduled,
      });

      if(delivery){
        setUserDefaultAddress({          
          delivery: {
            ...delivery,
            how,
          },
          address: addressData,
        });
      }
      
      setDelivery(null);
    }

    function returnToOrigin(){
      if(onClose){
        onClose();
      }
      if(history){
        if(location && location.state){
          history.replace(location.state.from);
        } else {
          history.push(`${HOME_PAGE_URL()}`);
        }
      }
    }

    function goToAddress(data){
      setAddressData(data);
      history.push(`${basePath}/address`);
    }

    function goToSchedule(){
      history.push(`${basePath}/schedule`);
    }

    function ignoreSchedule(){
      setScheduled(null);
    }

    const basePath = `/${ORDER_OPTIONS_PAGE_URL()}`;

    return (
        <Grid  
          className={cn(
            'order-options-l1',
            className
          )} 
          style={{
                ...style 
          }}
          containeritem
          {...breakpoints}
          {...others}
        >     
              
          {(
            loadingAPI 
          ) ? (
            <Grid 
              className="full-loading"
              container 
              justify="center" 
              alignItems="center" 
            >
              <CircularProgress />
            </Grid>
          ) :  (                                          
            <div className="scroller-container">            
                <AnimatedSwitch>
                  <Route 
                      path={`${basePath}`}
                      exact
                      render={ 
                          routerProps => (
                              <DeliveryOptions 
                                onDone={deliveryOptionsDone}
                                onNext={goToAddress}
                                address={tmpAddress}
                                onScheduleClick={goToSchedule}
                                onScheduleIgnore={ignoreSchedule}
                                mode={"pickup"}
                                schedule={scheduled}
                                isScheduled={scheduled && (typeCode === 'pickup' || typeCode === 'delivery')}
                                noDelivey={noDeliverySupport}
                                isMobile={isMobile}
                                breakpoints={breakpoints}
                              />
                          )
                      }
                  />

                  <Route 
                      path={`${basePath}/address`}
                      render={ 
                        routerProps => (
                            <AddressOptions 
                              onDone={addressOptionsDone}
                              basePath={basePath}
                              isMobile={isMobile}
                              breakpoints={breakpoints}
                            />
                        )
                      }
                  />
                  <Route 
                      path={`${basePath}/schedule`}                       
                      render={ 
                        routerProps => (
                            <Schedule 
                              onDone={scheduleDone}
                              buttons={ScheduleButtons}
                              buttonsProps={{
                                breakpoints: breakpoints
                              }}
                              startTime={storeDeliveryTimeRange.start}
                              endTime={storeDeliveryTimeRange.end}
                              noTimeLabel="Out of delivery time range"
                              dateTitle="Select delivery date"
                              timeTitle="Select delivery time"
                              basePath={`${basePath}/schedule`}
                            /> 
                        )
                      }
                  />
                  <Redirect to={`${basePath}`} />                                                              
                </AnimatedSwitch>
              </div>
          )}
        </Grid>
    );
}


export default connect(state => {
    return {
      defaultAddress: getUserDefaultAddress(state),
      deliveryCondition: getUserDeliveryCondition(state),
    }
},{
  setUserDefaultAddress,
  setDeliveryCondition,
})(Index);