import {
	CAMPAIGN_PROMO,
	ALL_PROMO_BATCH,
	CREATE_PROMO_BATCH,
	UPDATE_PROMO_BATCH,
	REMOVE_PROMO_BATCH,
	ALL_PROMO,
	REMOVE_PROMO,
	ERR_PROMO,
} from "../actions/actionTypes";

const initialState = {
	campaigns: [],
	promoBatches: [],
	promos: [],
	errors: {},
};

export default function promoReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CAMPAIGN_PROMO:
			return {
				...state,
				campaigns: payload,
				loading: false,
			};
		case ALL_PROMO_BATCH:
			return {
				...state,
				promoBatches: payload,
				loading: false,
			};
		case ALL_PROMO:
			return {
				...state,
				promos: payload,
				loading: false,
			};
		case UPDATE_PROMO_BATCH:
			return {
				...state,
				promoBatches: state.promoBatches.map((promoBatch) =>
					promoBatch.campaign_batch_id === payload.campaign_batch_id
						? { ...payload }
						: promoBatch
				),
				loading: false,
			};
		case CREATE_PROMO_BATCH:
			return {
				...state,
				promoBatches: [payload, ...state.promoBatches],
				loading: false,
			};
		case REMOVE_PROMO_BATCH:
			return {
				...state,
				promoBatches: state.promoBatches.filter(
					(promoBatch) => promoBatch.campaign_batch_id !== payload
				),
				loading: false,
			};
		case REMOVE_PROMO:
			return {
				...state,
				promos: state.promos.filter(
					(promo) => promo.client_promo_id !== payload
				),
				loading: false,
			};
		case ERR_PROMO:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
}
