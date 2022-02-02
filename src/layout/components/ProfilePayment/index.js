import React, { useEffect, useState } from 'react';
import cn from "classnames";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import fetchPaymentMethods from "../../../store/actions/user/fetchPaymentMethods";
import addPaymentMethod from "../../../store/actions/user/addPaymentMethod";
import selectPaymentMethods from "../../../store/selectors/user/selectPaymentMethods";
import selectAddMethod from "../../../store/selectors/user/selectAddMethod";

import AnimatedSwitch from "../AnimatedSwitch";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

import CardList from "./components/CardList";
import CardDetails from "./components/CardDetails";
import BillingAddress from "./components/BillingAddress";

import useReduxCallback from "../../hooks/useReduxCallback";

import isMobile from "../../../functions/isMobile";


function Index(props) {
	const { 
        className, 
        style,
        onClose,
        paymentMethods:{
            status: fetchMethodsStatus,
            list: fetchMethodsList,
        },
        addMethod: {
          status: addMethodStatus,
        },
        fetchPaymentMethods,
        addPaymentMethod,
        basePath,
        history,
        staticContext,
        ...others
    } = props;


    const [ card, setCard ] = useState(null);

    useReduxCallback(addDone, null, addMethodStatus);

    useEffect(() => {
        fetchPaymentMethods();
    }, [])

    function newCard(){
        history.push(`${basePath}/details`);
    }

    function cardDetailsDone(data){
        setCard(data);
        history.push(`${basePath}/address`);
    }

    function addressDone(data){
        addPaymentMethod({
            address: data,
            card,
        });
    }

    function addDone(){
        history.replace(basePath);
    }

    const noCard = !card;

    return (
        <div 
        	className={cn(
        		'profile-payment-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="container">
                <AnimatedSwitch>                                                                                
                    <Route 
                        path={`${basePath}`}
                        exact
                        render={routerProps => (
                            <CardList 
                                onNext={newCard} 
                                cards={fetchMethodsList} 
                                isMobile={isMobile}
                            />
                        )}
                    />                        
                    <Route 
                        path={`${basePath}/details`}
                        render={ 
                            routerProps => (
                                <CardDetails 
                                    onNext={cardDetailsDone} 
                                    isMobile={isMobile}
                                />
                            )
                        }
                    />
                    <Route 
                        path={`${basePath}/address`}
                        render={ 
                            routerProps => (
                                <BillingAddress 
                                    loading={addMethodStatus === 'pending'} 
                                    noCard={noCard}
                                    onDone={addressDone}
                                    homePath={basePath} 
                                    isMobile={isMobile}
                                />
                            )
                        }
                    />
                    <Redirect to={`${basePath}`} /> 
                </AnimatedSwitch>
            </div>
        </div>
    );
}


export default connect(state => {
    return {
        paymentMethods: selectPaymentMethods(state),
        addMethod: selectAddMethod(state)
    }

},{
    fetchPaymentMethods,
    addPaymentMethod,
})(Index);