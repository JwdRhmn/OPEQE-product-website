import React, { useEffect } from 'react';
import cn from "classnames";
import { connect } from "react-redux";

import fetchRewards from "../../../store/actions/user/fetchRewards";
import selectRewards from "../../../store/selectors/user/selectRewards";

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import EmptyListIcon from "../EmptyListIcon";

import Item from "./components/Item";

import isMobile from "../../../functions/isMobile";

function Index(props) {
    const { 
        className, 
        style,
        rewards: {
            status: rewardStatus,
            list: rewardList,
        },
        fetchRewards,
        ...others
    } = props;


    useEffect(() => {
        fetchRewards();
    }, [])

    return (
        <div 
            className={cn(
                'profile-promo-l1',
                {"mobile": isMobile},
                className
            )} 
            style={{
                ...style 
            }}
            {...others}
        >
            {rewardList.length ? (
                rewardList.map(
                    reward => (
                        <Item 
                            key={reward.id}
                            title={reward.title}
                            description={reward.description}
                            amount={reward.amount}
                        />
                    )
                )
                ) : (
                    <EmptyListIcon 
                        icon={
                            CardGiftcardIcon
                        }
                    />                
                )}
        </div>
    );
}


export default connect(state => {
    return {
        rewards: selectRewards(state),
    }

},{
    fetchRewards,
})(Index);