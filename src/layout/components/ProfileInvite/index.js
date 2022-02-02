import React, { useEffect } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import selectReferral from "../../../store/selectors/user/selectReferral";

import { ReactComponent as WhatsAppIcon } from  "../../assets/images/icons/whatsapp.svg"
import { ReactComponent as ImessageIcon } from  "../../assets/images/icons/imessage.svg"

import MailIcon from '@material-ui/icons/Mail';

import IconButton from '@material-ui/core/IconButton';

import promptSMS from "../../functions/promptSMS";
import promptWhatsapp from "../../functions/promptWhatsapp";


function Index(props) {
	const { 
        className, 
        style,
        referral: {
            status: referralStatus,
            data: referralData,
        },
        referralCode,
        ...others
    } = props;


    const smsText = `${referralData.message} %0A%0A ${referralData.urls}`;

    return (
        <div 
        	className={cn(
        		'profile-invite-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <div className="text">
                Your Referral Code
            </div>
            <div className="code">
                {referralCode}
            </div>
            <div className="text">
                {(referralData && referralStatus === "success") && (
                    referralData.description
                )}
            </div>
            <div className="share">
                <IconButton 
                    className="button whatsapp"
                    onClick={() => promptWhatsapp(referralData.urls)}
                >
                    <WhatsAppIcon width={50} />
                </IconButton>                
                <IconButton 
                    className="button sms"
                    onClick={() => promptSMS(smsText)}
                >
                    <ImessageIcon width={50} />
                </IconButton>
                <IconButton className="button more">
                    <MailIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}


export default connect( state => ({
    referral: selectReferral(state),
}),{

})(Index);