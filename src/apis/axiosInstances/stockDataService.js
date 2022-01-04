import axios from 'axios';
import { constants } from 'utils/constants';

const stockDataApi = axios.create({
	baseURL: constants('stocksDataServiceUrl'),
	timeout: 0,
});

stockDataApi.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error);
	},
);

export default stockDataApi;
