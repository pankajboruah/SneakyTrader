import axios from 'axios';

const stockDataApi = axios.create({
	baseURL: 'http://localhost:4000',
	timeout: 0,
});

stockDataApi.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error);
	},
);

export default stockDataApi;
