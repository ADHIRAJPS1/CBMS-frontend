import {
	ALL_CAMPAIGN,
	ALL_ASSIGNED_CAMPAIGNS,
	ASSIGN_CAMPAIGN,
	ERR_CAMPAIGN,
} from "../actions/actionTypes";

const initialState = {
	campaigns: [],
	assignedCampaigns: [],
	loading: true,
	errors: {},
};

export default function campaignReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ALL_CAMPAIGN:
			return {
				...state,
				campaigns: payload,
				loading: false,
			};
		case ALL_ASSIGNED_CAMPAIGNS:
			return {
				...state,
				assignedCampaigns: payload,
				loading: false,
			};

		case ASSIGN_CAMPAIGN:
			return {
				...state,
				assignedCampaigns: [payload, ...state.assignedCampaigns],
				loading: false,
			};
		//     case UPDATE_ASSIGN_CAMPAIGN:
		// 	return {
		// 		...state,
		// 		clients: state.clients.map((client) =>
		// 			client.client_id === payload.client_id ? { ...payload } : client
		// 		),
		// 		loading: false,
		// 	};
		// case REMOVE_CLIENT:
		// 	return {
		// 		...state,
		// 		clients: state.clients.filter((client) => client.client_id !== payload),
		// 		loading: false,
		// 	};
		case ERR_CAMPAIGN:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
}
