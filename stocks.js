/* eslint-disable */
const { stocksData } = require('./src/constants/data.json');

module.exports = () => {
	const res = stocksData.filter(
		({ name, currentPrice, prevPrice }) =>
			name.length > 0 && !!currentPrice && !!prevPrice,
	);
	return { stocks: res };
};
