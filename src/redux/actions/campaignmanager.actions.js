import { apicall } from "../../services/api";
import {
    BANNERS_LIST,
	CAMPAIGN_BANNERS, 
    ERR_CAMPAIGN_BANNERS , 
    ERR_BANNER,
    CREATE_CAMPAIGN_BANNER
} from "./actionTypes";

import { setAlert } from "./alert.actions";

// caampaign id provided
export const getAllBannersOfCampaign = (id) => async (dispatch) => {
    try {
        const res = await apicall(`campaign_banner/${id}`, "get");
        // console.log(" data = ", res);
        dispatch({
            type: CAMPAIGN_BANNERS,
            payload: res.data
        });
    } catch (err) {
        // console.log(" error = ", err);
        dispatch({
            type: ERR_CAMPAIGN_BANNERS,
            payload: { msg: err.response.statusText , status: err.response.status },
        });
        dispatch(setAlert("Unable to fetch data", "error"));
    }
};

export const getListOfBanners = () => async (dispatch) => {
    try{
        const res = await apicall(`banner`, "get");
        // console.log(" banners = ", res.data.data);
        dispatch({
            type: BANNERS_LIST,
            payload: res.data.data
        });
    } catch(err) {
        dispatch({
            type: ERR_CAMPAIGN_BANNERS,
            payload: { msg: err.response.statusText , status: err.response.status }
        });
        dispatch(setAlert("Unable to fetch banners list", "error"));
    }
};

export const saveCampaignBanner = (data) => async(dispatch) => {
    try{
        console.log(" save campaign banner= ");
        const res = await apicall(`campaign_banner`, "post", data);
        console.log(" save campaign banner 2 = ", res);
        
        dispatch({
            type: CREATE_CAMPAIGN_BANNER,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: ERR_CAMPAIGN_BANNERS,
            payload: { msg: err.response.statusText , status: err.response.status }
        });
    }
};


export const updateBanner = (id) => async (dispatch) => {
    try {

    } catch (err) {
        console.log(" error = ", err);
        dispatch({
            type: ERR_BANNER ,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}


