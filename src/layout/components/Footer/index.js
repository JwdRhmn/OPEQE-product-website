import React from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import setDeliveryCondition from "../../../store/actions/user/setDeliveryCondition";
import selectReferral from "../../../store/selectors/user/selectReferral";
import selectPromo from "../../../store/selectors/product/selectPromo";



import Grid from "@material-ui/core/Grid";

import Image from "./components/Image";
import Top from "./components/Top";
import Middle from "./components/Middle";
import Bottom from "./components/Bottom";

import useRouter from "../../hooks/useRouter";

function Index(props) {
	const { 
        referral: {
            data: referralData,
        },
        specials: { data: specials },
        setDeliveryCondition,
        className, 
        style,        
        ...others
    } = props;

    const {history} = useRouter();

    const topImageBreakpoints={
        xs: 12,
    }

    const baseBreakpoints={
        xs: 11,
        sm: 11,
        md: 10,
        lg: 9,
        xl: 9,
    }

    function setOrderType(type){
        setDeliveryCondition({
            type: type,
            schedule: null,
        });        
    }

    return (
        <Grid 
        	className={cn(
        		'footer-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            container
            justify="center"
            {...others}
        >
            <Image breakpoints={topImageBreakpoints} />
            <Top  breakpoints={baseBreakpoints}/>
            <Middle 
                history={history} 
                setOrderType={setOrderType} 
                breakpoints={baseBreakpoints} 
                freeFood={referralData.message}
                specials={specials}
            />
            <Bottom breakpoints={baseBreakpoints} />
        </Grid>
    );
}



export default connect(
    state => {
        return {
            referral: selectReferral(state),
            specials: selectPromo(state)
        }
    },
    {
        setDeliveryCondition
    }
)(Index);