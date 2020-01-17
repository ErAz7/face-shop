import { FETCH_PRODUCTS_URL } from "../config/constants";

// this function creates a request for
// products API to be passed to axios later

export default ({ page, limit, sort } = {}) => {
	let query = "";
	query = addFilter(query, "page", page);
	query = addFilter(query, "limit", limit);
	query = addFilter(query, "sort", sort);

	return {
		url: FETCH_PRODUCTS_URL + query,
		method: "GET"
	};
};

// this function takes query, filter name and filter,
// applies filters and returns new query
const addFilter = (query, name, value) =>
	query + (value ? `${query === "" ? "?" : "&"}_${name}=${value}` : "");
