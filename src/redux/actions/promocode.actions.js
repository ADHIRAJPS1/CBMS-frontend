import { apicall } from "../../services/api";
import {
	CAMPAIGN_PROMO,
	ALL_PROMO_BATCH,
	CREATE_PROMO_BATCH,
	UPDATE_PROMO_BATCH,
	REMOVE_PROMO_BATCH,
	ALL_PROMO,
	REMOVE_PROMO,
	ERR_PROMO,
} from "./actionTypes";
import { setAlert } from "./alert.actions";

export const getAllCampaignPromo = () => async (dispatch) => {
	try {
		const res = await apicall(`campaign_promo/campaigns/all/`, "get");
		dispatch({
			type: CAMPAIGN_PROMO,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_PROMO,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const getAllPromoBatch = () => async (dispatch) => {
	try {
		const res = await apicall(`campaign_promo/`, "get");
		dispatch({
			type: ALL_PROMO_BATCH,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_PROMO,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const getAllPromos = (campaign_batch_id) => async (dispatch) => {
	try {
		const res = await apicall(`campaign_promo/${campaign_batch_id}/`, "get");
		dispatch({
			type: ALL_PROMO,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: ERR_PROMO,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to fetch data", "error"));
	}
};

export const createPromoBatch = (formData) => async (dispatch) => {
	try {
		const res = await apicall("campaign_promo/", "post", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});

		dispatch({
			type: CREATE_PROMO_BATCH,
			payload: res.data.data,
		});

		dispatch(getAllPromoBatch());
		dispatch(setAlert("Promo batch created successfully", "success"));
	} catch (err) {
		dispatch({
			type: ERR_PROMO,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert("Unable to create promo batch", "error"));
	}
};

// export const updatePromoBatch = (campaign_batch_id, formData) => async (dispatch) => {
// 	try {
// 		const res = await apicall(`clients/${campaign_batch_id}`, "patch", formData, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 				"Access-Control-Allow-Origin": "*",
// 			},
// 		});
// 		dispatch({
// 			type: UPDATE_PROMO_BATCH,
// 			payload: res.data,
// 		});
// 	} catch (err) {
// 		// const errors = err.response.data.errors;

// 		// if (errors) {
// 		// 	errors.forEach((error) =>
// 		// 		dispatch(setAlert(error.msg, "danger", 5000))
// 		// 	);
// 		// }
// 		dispatch({
// 			type: ERR_PROMO,
// 			payload: { msg: err },
// 		});
// 	}
// };

export const deletePromoBatch = (campaign_batch_id) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(
				`campaign_promo/${campaign_batch_id}`,
				"delete"
			);
			dispatch({ type: REMOVE_PROMO_BATCH, payload: campaign_batch_id });
			dispatch(setAlert("Promo batch deleted successfully", "success"));
		} catch (err) {
			dispatch({
				type: ERR_PROMO,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
			dispatch(setAlert("Unable to delete promo batch", "error"));
		}
	}
};
export const deletePromo = (promoArr) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(`campaign_promo/`, "delete", promoArr, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Access-Control-Allow-Origin": "*",
				},
			});

			dispatch({ type: REMOVE_PROMO, payload: res.data.data.client_promo_id });
			dispatch(setAlert("Promocode deleted successfully", "success"));
		} catch (err) {
			dispatch({
				type: ERR_PROMO,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
			dispatch(setAlert("Unable to delete promo", "error"));
		}
	}
};
