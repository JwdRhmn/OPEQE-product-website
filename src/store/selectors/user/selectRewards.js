import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  	[ 
		state => state.user.rewards,
  	],
	rewards => transform(rewards),
)




const transform = rewards => {
    const list = transformList(rewards.list);
    return  {
        list,
        status: getStatus(rewards.status),
    };
}


const transformList = list => list.map( ({
	id,
    rewardType,
    title,
    description,
    policy,
    image,
    voucher,
    amount,
    limit,
    value,
    quantity,
    percentage,
    usagePolicy,
    isCashReward,
    isPoint,
    expiration,
}) => {
	return {
		id,
	    type: rewardType,
	    title,
	    description,
	    policy,
	    image,
	    voucher,
	    amount,
	    limit,
	    value,
	    quantity,
	    percentage,
	    usagePolicy,
	    isCashReward,
	    isPoint,
	    expiration,
	}
})


// var id : UUID
// var rewardType : String
// var title : String
// var description : String
// var policy : String
// var image : String
// var voucher : String
// var amount : Double
// var limit : Double
// var value : Double
// var quantity : Int
// var percentage : Double
// var usagePolicy : Int
// var isCashReward : Bool // if false apply only on fees like delivery and service
// var isPoint : Bool // discard reward if true
// var expiration : String
// 
