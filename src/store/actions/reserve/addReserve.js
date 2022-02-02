import { ADD_RESERVE } from "../../config/actionNames";
import addReserve from "../../../api/reserve/addReservation";
import formatDate from "../../../api/functions/formatData";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default ({
	isWaitlist,
	note,
	count,
	type,
	schedule,
	event,
}) => (dispatch, getState) => {
	const data = {				
		isUser: true,
		orderId: '',
		eventId: schedule.event ? schedule.event.id : '',
		partyType: type,
		size: count,
		schedule: cerateFormattedDate( schedule ),
		note: note,
		isWaitlist: isWaitlist,
	}



	dispatch(
		addToQueue(
			{
				type: [ ADD_RESERVE ],
			},
			addReserve(
				addAuth(data, getState())
			)
		)
	)
}


const cerateFormattedDate = schedule => {
    const {
      hour,
      minute,
      year,
      monthName,
      meridiem,
      day,
    } = schedule;

    return formatDate({
      monthName,
      day,
      year,
      hour12: hour,
      minute,
      meridiem
    });
}
