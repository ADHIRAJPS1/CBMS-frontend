import { 
    BANNERS_LIST,
    CAMPAIGN_BANNERS, 
    CREATE_CAMPAIGN_BANNER, 
    ERR_CAMPAIGN_BANNERS,
    DELETE_CAMPAIGN_BANNER,
    UPDATE_CAMPAIGN_BANNER,
    GET_QUICKLINKS_OF_BANNER,
    CREATE_QUICKLINK_BANNER,
    CREATE_BRANDPARTNER,
    GET_BRANDPARTNER,
    ERR_BRANDPARTNER
} from "../actions/actionTypes";

const initialState = {
    banners: [],
    campaignbanners: [],
    loading: true,
    deleted: [],
    errors: {},
    status: null,
    newcampaign: [],
    quicklinks: [],
    brandpartners: []
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
                status: payload,
                loading: false
            }
        case DELETE_CAMPAIGN_BANNER:
            return {
                ...state,
                status: payload,
                loading: false
            }
        case UPDATE_CAMPAIGN_BANNER:
            return {
                ...state,
                status: payload,
                loading: false
            }
        case GET_QUICKLINKS_OF_BANNER:
            return {
                ...state,
                quicklinks: payload,
                loading: false
            }
        case CREATE_QUICKLINK_BANNER:
            return {
                ...state,
                status: payload,
                loading: false
            }
        case CREATE_BRANDPARTNER:
            return {
                ...state , 
                status: payload,
                loading: false
            }
        case GET_BRANDPARTNER:
            return {
                ...state,
                brandpartners: payload,
                loading: false
            }
        case ERR_BRANDPARTNER:
            return {
                ...state , 
                status: payload,
                brandpartners: [],
                loading: false
            }
        default:
            return state;
    }

}