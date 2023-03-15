import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType, timeout) => (dispatch) => {
	const id = uuidv4();
	dispatch({
		type: SET_ALERT,
		payload: {
			msg,
			alertType,
			id,
		},
	});

	setTimeout(
		() =>
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			}),
		5000
	);
};
