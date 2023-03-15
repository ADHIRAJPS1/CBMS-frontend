import {
	ALL_CLIENTS,
	CLIENT,
	CREATE_CLIENT,
	UPDATE_CLIENT,
	REMOVE_CLIENT,
	ERR_CLIENTS,
} from "../actions/actionTypes";

const initialState = {
	clients: [],
	client: null,
	loading: true,
	errors: {},
};

export default function clientReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ALL_CLIENTS:
			return {
				...state,
				clients: payload,
				loading: false,
			};
		case CLIENT:
			return {
				...state,
				client: payload,
				loading: false,
			};
		case UPDATE_CLIENT:
			return {
				...state,
				clients: state.clients.map((client) =>
					client.client_id === payload.client_id ? { ...payload } : client
				),
				loading: false,
			};
		case CREATE_CLIENT:
			return {
				...state,
				clients: [payload, ...state.clients],
				loading: false,
			};
		case REMOVE_CLIENT:
			return {
				...state,
				clients: state.clients.filter((client) => client.client_id !== payload),
				loading: false,
			};
		case ERR_CLIENTS:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
}
