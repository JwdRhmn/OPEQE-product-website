export default (reward, fees, totalPrice, totalQuantity, totalSpecialAppliedPrice) => {
    const {
        id,
        amount,
        limit,
        title,
        voucher,
        percentage,   
        isCashReward, 
        expiration,    
    } = reward;

    let type = "Cash";

    const expirationDate = new Date(expiration.replace('T', ' '));

    if(/*voucher !== '' ||*/ expirationDate.getTime() < Date.now()){
        return false;
    }

    let discount;

    if(reward.isPoint){
        return false;
    }

    if (
        checkCond(reward, totalPrice, totalQuantity)
    ) {
        let targetPrice;

        if(isCashReward){
            targetPrice = totalSpecialAppliedPrice;
        } else {
            type = "Service";
            if(fees.delivery > 0){
                targetPrice = fees.delivery;
            } else {
                targetPrice = fees.service;
            }
        }

        if (percentage !== 0) {
            discount = targetPrice * percentage * 0.01;
            if(limit > 0 && discount > limit){
                discount = limit;
            }
        } else if(amount > 0){
            if (amount > targetPrice) {
                discount = targetPrice;
            } else {
                discount = amount;
            }            
        }
    }
    

    if(!discount){
        return false;
    }

    return {
        id,
        title,
        type,
        amount: discount,
    }
}

const checkCond = (reward, total, quantity) => {

    return (
        (quantity >= reward.quantity && reward.quantity > 0) 
        || (total >= reward.value && reward.value > 0)
        || (reward.quantity === 0 && reward.value === 0)
    );

}

//"id": "bdf19c61-b40b-4bc2-35c3-08d68a1237f5",
//"title": "Super Bowl",
//"description": "Ues this promo code to get 20 off on your entire order",
//"policy": "", //?
//"image": "",
//"voucher": "SUPERBOWL",
//"amount": 0,
//"limit": 0, //?
//"value": 0,
//"quantity": 0, //?
//"percentage": 20,
//"usagePolicy": 1, //?
//"isCashReward": true,
//"expiration": "2019-10-10T00:00:00"
