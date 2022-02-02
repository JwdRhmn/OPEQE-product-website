import { CHECK_RESRVE_AVAILABILITY } from "../../config/actionNames";
import checkReservation from "../../../api/reserve/checkReserveAvailability";
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
		eventId: '',
		partyType: '',
		size: count,
		schedule: cerateFormattedDate( schedule ),
		note: '',
		isWaitlist: false,
	}

	dispatch(
		addToQueue(
			{
				type: [ CHECK_RESRVE_AVAILABILITY ],
			},
			checkReservation(
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

