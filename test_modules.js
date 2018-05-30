const axios = require('axios');

module.exports = {
	getExchangeData(date, base, conversion){
		return axios
			.get(`https://exchangeratesapi.io/api/${date}?base=${base}&symbols=${conversion}`)
			.then(res => res.data);
	}
}