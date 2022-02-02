import { EDIT_USER_NAME } from "../../config/actionNames";
import editName from "../../../api/user/editName";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectUserData from "../../selectors/user/selectUserData";


export default ({
	newName,
	nameType,
}) => (dispatch, getState) => {
	const state = getState();
	const userData = selectUserData(state).data;

	const dataForAPI = {
		number: userData.mobileNumber,
		old: (nameType === "first" ? userData.firstName : userData.lastName),
		new: newName,
		type: (nameType === "first" ? "FirstName" : "LastName"),
		verification: '',
	}

	const dataForStore = {
		newName,
		nameType,
	}

	dispatch(
		addToQueue(
			{
				type: [ EDIT_USER_NAME ],
				payload: dataForStore,
			},
			editName(
				addAuth(dataForAPI, state)
			)
		)
	);
}


