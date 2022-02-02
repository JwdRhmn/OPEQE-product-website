import { FETCH_CALENDAR_EVENTS } from "../../config/actionNames";
import getEventsAPI from "../../../api/calendar/getEvents";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default () => (dispatch, getState) => {
	dispatch(
		addToQueue(
			{
				type: [ FETCH_CALENDAR_EVENTS ],
			},
			getEventsAPI(
				addAuth({}, getState())
			)
		)
	)
}