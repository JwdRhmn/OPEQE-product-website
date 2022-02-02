import React from 'react';
import cn from "classnames";

import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import HourglassFullIcon from '@material-ui/icons/HourglassFullTwoTone';
import LocalShippingIcon from '@material-ui/icons/LocalShippingTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from "../../DefaultButton";
import ItemImage from "../../ItemImage";


import getConfirmationCode from "../../../../functions/getConfirmationCode";

export default function(props) {
	const { 
        className, 
        style,
        location,
        history,
        staticContext,
        type="upcoming",
        image,
        date,
        id,
        onAction,
        status,
        orderType,
        ...others
    } = props;
    
    function handleAction(index){
        let action = '';
        if(index === 0){
            if(isUpcoming){
                action = 'receipt';
            } else {
                action = 'reOrder';
            }
        } else {
            if(isUpcoming){
                action = 'cancel';
            } else {
                action = 'receipt';
            }
        }

        if(onAction){
            onAction(action, id, type);
        }
    }

    const isUpcoming = type === "upcoming";

    const confirmationCode = getConfirmationCode(id);

    const statusInfo = getStatus(status, orderType.toLowerCase().includes(' delivery'), orderType);

    const Icon = statusInfo.icon;



    function renderButtons(){
        return (
            <>
                <Button 
                    containerProps={{
                        className: "button-container"
                    }}
                    theme={isUpcoming ? "gray" : "dark"}
                    size="small"
                    onClick={() => handleAction(0)}
                >
                    {isUpcoming ? "View Receipt" : "Reorder"}
                </Button>
                <Button  
                    containerProps={{
                        className: "button-container"
                    }}
                    theme="light" 
                    size="small"
                    colorTheme="gray"
                    onClick={() => handleAction(1)}
                >
                    {isUpcoming ? "Cancel Order" : "View Receipt"}
                </Button>
            </>
        );
    }

    return (
        <Grid 
        	className={cn(
        		'item-l2',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            {...others}
        >
            <div className="image">
                <ItemImage src={image} />
            </div>            

            <div className="info">
                <span 
                    className={cn(
                        "icon",
                        `color-${statusInfo.color}`
                    )}
                >
                    <Icon />
                </span>                
                <span className="status">
                    {statusInfo.status}
                </span>
                <br />
                <span className="date">
                    {date}
                </span>
                <br />
                <span className="id">
                    Order #{confirmationCode}
                </span>
            </div>
            <Grid 
                className="buttons"
                container
            >
                {renderButtons()}
            </Grid>
        </Grid>
    );
}





const getStatus = (status, isDelivery, orderType) => {
    let out = {
        status: '',
        color: '',
        icon: null,
    };

    switch(status.toLowerCase()){
        case "issubmitted": {
            out.status = "Pending"
            out.color = "MediumGray"
            out.icon = HourglassFullIcon
            break;
        }
        case "isdelayed": {
            out.status = "Delayed"
            out.color = "DarkOrange"
            out.icon = InfoIcon
            break;
        }
        case "isconfirmed": {
            out.status = "Preparing your order"
            out.color = "LightGreen"
            out.icon = HourglassFullIcon
            break;
        }
        case "ischarged": {
            out.status = "Preparing your order"
            out.color = "LightGreen"
            out.icon = HourglassFullIcon
            break;
        }
        case "isprepared": {
            out.status = `Ready for ${orderType}`
            out.color = "LightGreen"
            out.icon = DoneIcon
            break;
        }
        case "ispickedup": {
            if(isDelivery) {
                out.status = `Out for ${orderType}` //?
                out.color = "LightGreen"
                out.icon = LocalShippingIcon

            } else {
                out.status = "Complete"
                out.color = "Green"
                out.icon = DoneAllIcon
            }
            break;
        }
        case "isdelivered": {
            out.status = "Complete"
            out.color = "Green"
            out.icon = DoneAllIcon
            break;
        }
        case "iscomplete": {
            out.status = "Complete"
            out.color = "Green"
            out.icon = DoneAllIcon
            break;
        }
        case "isready": {
            out.status = "Ready"
            out.color = "Green"
            out.icon = DoneIcon
            break;
        }
        case "iscanceledbydriver": {
            out.status = "Issue with delivery"
            out.color = "DarkOrange"
            out.icon = CancelIcon //?
            break;
        }
        case "iscanceledbycustomer": {
            out.status = "Cancelled"
            out.color = "Red"
            out.icon = CloseIcon
            break;
        }
        case "iscanceledbystore": {
            out.status = "Cancelled"
            out.color = "DarkOrange"
            out.icon = CloseIcon
            break;
        }
        case "iscanceled": {
            out.status = "Cancelled"
            out.color = "Red"
            out.icon = CloseIcon
            break;
        }
        default:
            out.color = "DimGray"
            out.status = "NA"
            out.icon = HelpIcon
            break;
        }

        return out;
}