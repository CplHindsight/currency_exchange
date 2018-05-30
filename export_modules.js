//Module declaration
const axios = require('axios');

//Export module for external use
module.exports = {
	//Method returns either the response or error from the API based on GET request
	getExchangeData(date, base, conversion){
		return axios
			.get(`https://exchangeratesapi.io/api/${date}?base=${base}&symbols=${conversion}`)
			.then(res => res.data)
			.catch(error => console.log(error));;
	}
}