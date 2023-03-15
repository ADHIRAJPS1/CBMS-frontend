import {
	ALL_USERS,
	USER,
	CREATE_USER,
	UPDATE_USER,
	REMOVE_USER,
	ERR_USERS,
} from "../actions/actionTypes";

const initialState = {
	users: [],
	user: null,
	loading: true,
	errors: {},
};

export default function userReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ALL_USERS:
			return {
				...state,
				users: payload,
				loading: false,
			};
		case USER:
			return {
				...state,
				user: payload,
				loading: false,
			};
		case UPDATE_USER:
			return {
				...state,
				users: state.users.map((user) =>
					user.id === payload.id ? { ...payload } : user
				),
				loading: false,
			};
		case CREATE_USER:
			return {
				...state,
				users: [payload, ...state.users],
				loading: false,
			};
		case REMOVE_USER:
			return {
				...state,
				users: state.users.filter((user) => user.id !== payload),
				loading: false,
			};
		case ERR_USERS:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
}
