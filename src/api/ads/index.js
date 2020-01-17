import { FETCH_ADS_URL } from "../config/constants";

// this function creates a request for
// ads API to be passed to axios later

export default () => {
	const rnd = parseInt(Math.random() * 10000);

	const query = `?r=${rnd}`;

	return {
		url: FETCH_ADS_URL + query,
		method: "GET"
	};
};
