import React from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import editPaymentMethod from "../../../../store/actions/user/editPaymentMethod";

import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import CreditCardIcon from '@material-ui/icons/CreditCard';

import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";
import CreditCard from "../../CreditCard";
import EmptyListIcon from "../../EmptyListIcon";

import isMobile from "../../../../functions/isMobile";

function Index(props) {
	const { 
        className, 
        style,
        onNext,
        selection,
        editPaymentMethod,
        cards=[],
        isMobile,
        ...others
    } = props;

    const handleSelect = id => event => {             
        editPaymentMethod({
            id,
            remove: false,
        });
    }

    const handleCardDelete = id =>  event => { 
        event.stopPropagation();    
        editPaymentMethod({
            id,
            remove: true
        });
    }


    return (
        <div 
        	className={cn(
        		'card-list-l2',
                {"mobile": isMobile},
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            {!cards.length ? (
                <EmptyListIcon
                    icon={CreditCardIcon}
                />
            ) : (
                <List>
                    {cards.map( card => (
                        <CreditCard 
                            key={card.id}
                            className="card"
                            icon={card.type}
                            expDate={card.expDate}
                            number={card.number}
                            zipCode={card.zipCode}
                            state={card.state}
                            action={ 
                                <>
                                    {card.isDefault &&
                                        <DoneIcon className="icon green" />
                                    }
                                    <IconButton
                                        onClick={handleCardDelete(card.id)}
                                    >
                                        <DeleteIcon className="icon gray" /> 
                                    </IconButton>
                                </>
                            }
                            onClick={handleSelect(card.id)}
                            button
                        />
                    ))}
                </List>
            )}
            <BottomFixedContainer className="submit">
                <Button
                    onClick={onNext}
                >
                    Add New Card
                </Button>
            </BottomFixedContainer>
        </div>
    );
}


export default connect(
    null
,{
    editPaymentMethod,
})(Index);