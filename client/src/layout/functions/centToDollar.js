// takes price in cents and
// returns in dollars, uses
// string operations to overcome
// JS floating point precision problem

export default cent => {
	if (!cent) {
		return "0.00";
	}
	const strCent = cent.toString();
	const dollar = strCent.substr(0, strCent.length - 2);
	const remainingCent = strCent.substr(-2, 2);

	const out = `${dollar.length ? dollar : "0"}.${
		remainingCent.length === 2 ? remainingCent : `0${remainingCent}`
	}`;

	return out;
};
