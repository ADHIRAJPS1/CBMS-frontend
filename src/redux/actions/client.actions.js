import { apicall } from "../../services/api";
import {
	ALL_CLIENTS,
	CLIENT,
	CREATE_CLIENT,
	UPDATE_CLIENT,
	REMOVE_CLIENT,
	ERR_CLIENTS,
} from "./actionTypes";
import { setAlert } from "./alert.actions";

export const getAllClients = () => async (dispatch) => {
	try {
		const res = await apicall(`clients/`, "get");
		// if (res.data.msg === "No data found.") {
		// 	dispatch({
		// 		type: ALL_CLIENTS,
		// 		payload: res.data.data,
		// 	});
		// } else {
		dispatch({
			type: ALL_CLIENTS,
			payload: res.data.data,
		});
		//}
	} catch (err) {
		dispatch({
			type: ERR_CLIENTS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const getClient = (clientId) => async (dispatch) => {
	try {
		const res = await apicall(`clients/${clientId}`, "get");
		dispatch({
			type: CLIENT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_CLIENTS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const createClient = (formData) => async (dispatch) => {
	try {
		const res = await apicall("clients/", "post", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});

		dispatch({
			type: CREATE_CLIENT,
			payload: res.data.data,
		});

		dispatch(getAllClients());
		dispatch(setAlert("Client Business created successfully", "success"));
	} catch (err) {
		dispatch({
			type: ERR_CLIENTS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to create client", "error"));
	}
};

export const updateClient = (clientId, formData) => async (dispatch) => {
	try {
		const res = await apicall(`clients/${clientId}`, "patch", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});
		dispatch({
			type: UPDATE_CLIENT,
			payload: res.data.data,
		});
		dispatch(setAlert("Client updated successfully", "success"));
	} catch (err) {
		// const errors = err.response.data.errors;

		// if (errors) {
		// 	errors.forEach((error) =>
		// 		dispatch(setAlert(error.msg, "danger", 5000))
		// 	);
		// }
		dispatch({
			type: ERR_CLIENTS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to update client", "error"));
	}
};

export const deleteClient = (clientId) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(`clients/${clientId}`, "delete");
			dispatch({ type: REMOVE_CLIENT, payload: clientId });
			dispatch(setAlert("Client deleted successfully", "success"));
		} catch (err) {
			dispatch({
				type: ERR_CLIENTS,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
			dispatch(setAlert("Unable to delete client", "error"));
		}
	}
};
