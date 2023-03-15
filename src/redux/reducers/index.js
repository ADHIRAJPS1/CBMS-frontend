import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import clientReducer from "./client.reducer";
import campaignReducer from "./campaign.reducer";
import promoReducer from "./promocode.reducer";
import alertReducer from "./alert.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
	authReducer,
	userReducer,
	alertReducer,
	clientReducer,
	campaignReducer,
	promoReducer,
});
