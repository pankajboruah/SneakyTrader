import stockDataApi from './axiosInstances/stockDataService';

export const getAllStocks = () => stockDataApi.get(`/stocks`);

export const getLimitedStocks = (page = 1, limit = 50) =>
	stockDataApi.get(`/stocks?_page=${page}&_limit=${limit}`);

export const getFilteredStocks = (query, page = 1, limit = 50) =>
	stockDataApi.get(`/stocks?name_like=${query}&_page=${page}&_limit=${limit}`);
