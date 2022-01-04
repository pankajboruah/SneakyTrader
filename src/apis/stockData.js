import stockDataApi from './axiosInstances/stockDataService';

export const getAllStocks = () => stockDataApi.get(`/stocksData`);

export const getLimitedStocks = (page = 1, limit = 50) =>
	stockDataApi.get(`/stocksData?_page=${page}&_limit=${limit}`);

export const getFilteredStocks = (query, page = 1, limit = 50) =>
	stockDataApi.get(
		`/stocksData?name_like=${query}&_page=${page}&_limit=${limit}`,
	);
