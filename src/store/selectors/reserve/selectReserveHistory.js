import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";


export default createSelector(
  	[ 
		state => state.reserve.history,
  	],
	history => transform(history),
)




const transform = history => {
    const list = mapList(history.list);
    return {
        list: list,
        status: getStatus(history.status),
    }
}


const mapList = list => list.map(
    ({
        id,
        partyType,
        partySize,
        event,
        order,
        color,
        schedule,
        note,
        date,
        status,
        isWaitlist,
    }) => {

        return {
            id: id,
            size: partySize,
            date: schedule,
            isWaitlist: isWaitlist,
            orderId: order,
        }
    }
)