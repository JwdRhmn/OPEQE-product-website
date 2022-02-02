export default (item) => {
    const { special, price, quantity, id } = item;

    let type = "Special";

    const {
        voucher,
        percentage,
        limit,
        beginTime, 
        remainingTime, 
        title,
    } = special;

    const beginDate = new Date(beginTime);
    const expirationStamp =  beginDate.getTime() + remainingTime * 1000

    if(remainingTime > 0){
        type = 'HappyHour';
    }

    if(voucher !== '' || expirationStamp < Date.now()){
        return false;
    }

    let amount = 0
    let total = quantity * price;
    if (checkCond(special, total, quantity)) {
        if ( checkExpired(special) ) { 
            if (percentage > 0) {
                amount = total * percentage * 0.01;
            } else {
                if (special.amount > total) {
                    amount = total;
                } else {
                    amount = special.amount;
                }
            }
            if (amount > limit && limit !== 0){
                amount = limit;
            }
        }
    }

    if(!amount){
        return false;
    }

    return {
        id,
        title: title,
        type,
        amount,
    }
}


const checkCond = (special, total, quantity) => {
    return (quantity >= special.quantity && special.quantity > 0) 
        || (total >= special.value && special.value > 0);
}


const checkExpired = ({beginTime, remainingTime}) => {
    return true;
}
//"title": "Chief Special",
// "description": "",
// "transcript": "GET $10.00 OFF WHEN ORDER $20.00 OR MORE OF THIS ITEM ",
// "policy": "",
// "image": "",
// "voucher": "",
// "beginTime": "00:00:00",
// "remainingTime": 0,
// "amount": 10,
// "percentage": 0,
// "limit": 0,
// "value": 20,
// "quantity": 0