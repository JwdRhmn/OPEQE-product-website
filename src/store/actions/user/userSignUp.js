import { USER_SIGNUP } from "../../config/actionNames";
import signUpAPI from "../../../api/user/signUp";
import { addToQueue } from "../../redux-pwa";

export default data => {
	return addToQueue(
		{
			type: [ USER_SIGNUP ],
		},
		signUpAPI({
			...data,
			countryCode: '1'
		})
	);
}