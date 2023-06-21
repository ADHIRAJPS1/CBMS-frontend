import { apicall } from "../../services/api";
import {
    BANNERS_LIST,
	CAMPAIGN_BANNERS, 
    ERR_CAMPAIGN_BANNERS , 
    ERR_BANNER,
    CREATE_CAMPAIGN_BANNER,
    UPDATE_CAMPAIGN_BANNER,
    DELETE_CAMPAIGN_BANNER,
    ERR_QUICKLINKS,
    GET_QUICKLINKS_OF_BANNER,
    CREATE_QUICKLINK_BANNER,
    CREATE_BRANDPARTNER,
    GET_BRANDPARTNER , 
    ERR_BRANDPARTNER
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


export const updateCamBanner = (id,data) => async (dispatch) => {
    try {
        const cbid = id;
        const res = await apicall(`campaign_banner/${cbid}`, "patch" , data );
        console.log(" update campaign banner = ",res);
        dispatch({
            type: UPDATE_CAMPAIGN_BANNER,
            payload: res.data
        })

    } catch (err) {
        console.log(" error = ", err);
        dispatch({
            type: ERR_BANNER ,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
};


export const deleteCampaignBanner = (campbannerid) => async(dispatch)=>{
    try{
        let cbid = campbannerid;
        const res = await apicall(`campaign_banner/delete/${cbid}`, "patch");
        console.log("res of delete = " ,res);
        dispatch({
            type: DELETE_CAMPAIGN_BANNER,
            payload: res.data
        })
    } catch (err) {
        console.log( "error = " ,err);
        dispatch({
            type : DELETE_CAMPAIGN_BANNER,
            payload: { msg: err.message.statusText , status: err.message.status }
        })
    }
};

export const getQuickLinksOfBanner =  (campbannerid) => async(dispatch) => {
    try{
        let cbid = campbannerid;
        const res = await apicall(`campaign_quicklinks/${cbid}`, "get");
        // console.log("get quicklinks = ", res.data);
        dispatch({
            type: GET_QUICKLINKS_OF_BANNER,
            payload: res.data.data
        })

    } catch(err) {
        console.log('get quick links for banners',err ) ;
        dispatch({
            type: ERR_QUICKLINKS,
            payload: { msg: err.message.statusText , status: err.message.status }
        })
    }
};

export const createQuickLinks = (data) => async (dispatch) => {
    try {
        // let data = data ;
        const res = await apicall(`campaign_quicklinks`, "post", data);
        console.log("ql = ",res);
        dispatch({
            type: CREATE_BRANDPARTNER,
            payload: res.data
        })
    } catch (err) {
        console.log("error while creating a quick link",err) ;
        dispatch({
            type: ERR_QUICKLINKS,
            payload: { msg: err.message.statusText , status: err}
        })
    };
};

export const getBrandPartnersOfCampaign = (id) => async (dispatch) => {
    try{
        const res = await apicall(`campaign_brandpartners/${id}`, "get");
        console.log(" get brandpartners request = ", res);
        dispatch({
            type: GET_BRANDPARTNER,
            payload: res.data.data
        });
    } catch (err) {
        console.log("error while fetching brandpartners of the campaign  ",err) ;
        dispatch({
            type: ERR_BRANDPARTNER,
            payload: { msg: err.message.statusText , status: err}
        })
    }
}

export const createBrandPartners = (data) => async (dispatch) => {
    try{
        console.log(" data received = ",data);
        const res = await apicall(`campaign_brandpartners`, "post", data);
        console.log("res data create brand partner = ", res);
        dispatch({
            type: CREATE_BRANDPARTNER,
            payload: res
        });
    } catch (err) {
        console.log("error while creating a brandpartner ",err) ;

        dispatch({
            type: ERR_BRANDPARTNER,
            payload: { msg: err.message.statusText , status: err}
        })
    }
};


