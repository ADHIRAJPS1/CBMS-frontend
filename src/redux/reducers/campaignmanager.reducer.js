import { 
    BANNERS_LIST,
    CAMPAIGN_BANNERS, 
    CREATE_CAMPAIGN_BANNER, 
    ERR_CAMPAIGN_BANNERS 
} from "../actions/actionTypes";

const initialState = {
    banners: [],
    campaignbanners: [],
    loading: true,
    errors: {}
};

export default function campaignBannerReducer(state = initialState, action) {
    const { type , payload } = action;

    switch (type) {
        case CAMPAIGN_BANNERS:
            return {
                ...state,
                campaignbanners: payload,
                loading: false
            };
        case ERR_CAMPAIGN_BANNERS:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case BANNERS_LIST:
            return {
                ...state,
                banners: payload,
                loading: false
            };
        case CREATE_CAMPAIGN_BANNER:
            return {
                ...state,
                campaignbanners: payload,
                loading: false
            }
        default:
            return state;
    }

}