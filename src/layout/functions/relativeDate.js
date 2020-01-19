import formatDate from "./formatDate";

// takes date string and returns
// exact date if date is more than
// 1 week ago, otherwise returns
// approximate relative date
// this could return exact relative
// date (like '10 mins 2 hours 4 days ...')
// but this is waste of time (not hard though)

export default dateStr => {
	const date = new Date(dateStr);
	const now = Date.now();
	const diff = parseInt((now - date.getTime()) / 1000);
	if (diff > 24 * 3600 * 7) {
		return formatDate(date);
	} else {
		if (diff < 3600) {
			const count = parseInt(diff / 60);
			return `${count} minute${count > 1 ? "s" : ""} ago`;
		} else if (diff < 3600 * 24) {
			const count = parseInt(diff / 3600);
			return `${count} hour${count > 1 ? "s" : ""} ago`;
		} else {
			const count = parseInt(diff / (3600 * 24));
			return `${count} day${count > 1 ? "s" : ""} ago`;
		}
	}
};
