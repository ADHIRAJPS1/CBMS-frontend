import { apicall } from "../../services/api";
import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "./actionTypes";
import setAuthToken from "../../services/setAuthToken";
import { setAlert } from "./alert.actions";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		try {
			setAuthToken(localStorage.token);
			const res = await apicall("admins/auth", "get");

			dispatch({
				type: USER_LOADED,
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
			dispatch(setAlert(err.response.statusText, "error"));
		}
	} else {
		dispatch({
			type: AUTH_ERROR,
			payload: { msg: "Authentication error", status: 500 },
		});
		dispatch(setAlert("Authentication error", "error"));
	}
};

//Login User
export const login = (email, password) => async (dispatch) => {
	const body = { email, password };
	try {
		const res = await apicall(`admins/login`, "post", body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data.data,
		});

		dispatch(loadUser());
	} catch (err) {
		console.log(err);
		dispatch({
			type: LOGIN_FAIL,
		});
		dispatch(setAlert(err.response.statusText, "error"));
	}
};

//Logout / Clear profile
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
