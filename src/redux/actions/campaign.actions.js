import { apicall } from "../../services/api";
import {
	ALL_CAMPAIGN,
	ALL_ASSIGNED_CAMPAIGNS,
	ASSIGN_CAMPAIGN,
	ERR_CAMPAIGN,
} from "./actionTypes";
import { setAlert } from "./alert.actions";

export const getUnassignedCampaigns = () => async (dispatch) => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_BASE_URL_VMS}campaigns/all/`
		);
		const res = await response.json();
		dispatch({
			type: ALL_CAMPAIGN,
			payload: res,
		});
	} catch (err) {
		dispatch({
			type: ERR_CAMPAIGN,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const getAllAssociations = () => async (dispatch) => {
	try {
		const res = await apicall(`campaign_assign/`, "get");
		dispatch({
			type: ALL_ASSIGNED_CAMPAIGNS,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_CAMPAIGN,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const createAssociation = (formData) => async (dispatch) => {
	try {
		const res = await apicall("campaign_assign/", "post", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});

		dispatch({
			type: ASSIGN_CAMPAIGN,
			payload: res.data.data,
		});

		dispatch(getAllAssociations());
		dispatch(setAlert("Campaign assigned successfully", "success"));
	} catch (err) {
		dispatch({
			type: ERR_CAMPAIGN,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to assign campaign", "error"));
	}
};

// export const updateAssociation = (clientId, formData) => async (dispatch) => {
// 	try {
// 		const res = await apicall(`clients/${clientId}`, "patch", formData, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 				"Access-Control-Allow-Origin": "*",
// 			},
// 		});
// 		dispatch({
// 			type: UPDATE_ASSIGN_CAMPAIGN,
// 			payload: res.data.data,
// 		});
// 	} catch (err) {
// 		// const errors = err.response.data.errors;

// 		// if (errors) {
// 		// 	errors.forEach((error) =>
// 		// 		dispatch(setAlert(error.msg, "danger", 5000))
// 		// 	);
// 		// }
// 		dispatch({
// 			type: ERR_CAMPAIGN,
// 			payload: { msg: err },
// 		});
// 	}
// };

// export const deleteAssociation = (clientId) => async (dispatch) => {
// 	if (window.confirm("Are you sure? This can NOT be undone!")) {
// 		try {
// 			const res = await apicall(`clients/${clientId}`, "delete");
// 			dispatch({ type: REMOVE_ASSIGN_CAMPAIGN, payload: clientId });
// 			// dispatch({
// 			// 	type: ERR_CLIENTS,
// 			// 	payload: { msg: `Brand deleted successfully!`, status: res.status },
// 			// });
// 		} catch (err) {
// 			dispatch({
// 				type: ERR_CAMPAIGN,
// 				payload: { msg: err.response.msg, status: err.response.status },
// 			});
// 		}
// 	}
// };
