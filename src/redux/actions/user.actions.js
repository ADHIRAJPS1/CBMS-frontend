import { apicall } from "../../services/api";
import {
	ALL_USERS,
	USER,
	CREATE_USER,
	UPDATE_USER,
	REMOVE_USER,
	ERR_USERS,
} from "./actionTypes";
import { setAlert } from "./alert.actions";

export const getAllUsers = () => async (dispatch) => {
	try {
		const res = await apicall(`admins/`, "get");

		dispatch({
			type: ALL_USERS,
			payload: res.data.data,
		});
	} catch (err) {
		// dispatch({
		// 	type: ERR_USERS,
		// 	payload: { msg: err.response.statusText, status: err.response.status },
		// });
		console.log(err);
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const getUser = (userId) => async (dispatch) => {
	try {
		const res = await apicall(`admins/${userId}`, "get");
		dispatch({
			type: USER,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_USERS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const createUser = (formData) => async (dispatch) => {
	try {
		const res = await apicall("admins/", "post", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});

		dispatch({
			type: CREATE_USER,
			payload: res.data.data,
		});

		dispatch(getAllUsers());
		dispatch(setAlert("User created successfully", "success"));
	} catch (err) {
		dispatch({
			type: ERR_USERS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to create user", "error"));
	}
};

export const updateUser = (userId, formData) => async (dispatch) => {
	try {
		delete formData["id"];
		const res = await apicall(`admins/${userId}`, "patch", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});
		dispatch({
			type: UPDATE_USER,
			payload: res.data.data,
		});
		dispatch(setAlert("User updated successfully", "success"));
	} catch (err) {
		// const errors = err.response.data.errors;

		// if (errors) {
		// 	errors.forEach((error) =>
		// 		dispatch(setAlert(error.msg, "danger", 5000))
		// 	);
		// }
		dispatch({
			type: ERR_USERS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to update user", "error"));
	}
};

export const deleteUser = (userId) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(`admins/${userId}`, "delete");
			dispatch({ type: REMOVE_USER, payload: userId });
			dispatch(setAlert("User deleted successfully", "success"));
		} catch (err) {
			dispatch({
				type: ERR_USERS,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
			dispatch(setAlert("Unable to delete user", "error"));
		}
	}
};
