import axios from "axios";

// Create an instance of axios
const lh = "http://localhost:5000/api/v1/";
const goorm = process.env.REACT_APP_BASE_URL_CBM;

export const apicall = async (
	path,
	method,
	data,
	options = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
	},
	baseURL = goorm
) => {
	return await axios({
		method,
		url: baseURL + path,
		data,
		options,
	});
};
