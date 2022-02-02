import getUserAuth from "../../selectors/user/getUserAuth";

export default (data, state) => {
	const token =  getUserAuth( state );
	return {
		...data,
		token,
	};
}