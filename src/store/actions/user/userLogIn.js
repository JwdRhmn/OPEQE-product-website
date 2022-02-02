import { USER_LOGIN } from "../../config/actionNames";
import logInAPI from "../../../api/user/logIn";
import { addToQueue } from "../../redux-pwa";

export default data => {
	return addToQueue(
		{
			type: [ USER_LOGIN ],
		},
		logInAPI(data)
	);
}