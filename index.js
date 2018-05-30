//Module declaration
const axios = require('axios');

//Const variables
const exchangeURL = 'https://exchangeratesapi.io/api/';

//Class creating JSON structured object
class ExchangedCurrency{

	constructor(date, bCurrency, amount, cCurrency, rate, dec){
		this.date = date;
		this.base_currency = bCurrency;
		this.base_amount = amount;
		this.conversion_currency = cCurrency;
		this.conversion_amount = parseFloat(amount) * rate;
	}

	getObject(){
		return `{
					Date: ${this.date},
					Base Currency: ${this.base_currency},
					Base Amount: ${this.base_amount},
					Conversion Currency: ${this.conversion_currency},
					Conversion Amount: ${this.conversion_amount.toFixed(2)}
				}`;
		}

	print(){
		return console.log(this.getObject());
	}

	setConversionAmount(amount){
		this.conversion_amount = amount;
	}

}

//Initial application entry point
main();

//Main Application
function main(){
	var set = GetCLArguments();
	var date, base, amount, eBase;
	date = set[0];
	base = set[1];
	amount = set[2];
	eBase = set[3];

	//Use the Axios HTTP client to call the API
	axios.get(exchangeURL + date, {
		    params: {
		    	base: base,
		    	symbols: eBase
	    	}
		  	})
		  	.then(function (response) {
		  		//Note: Do not have to use a class here, can create a javascript object, but want to display use of class object
		  		var ec = new ExchangedCurrency(date, base, amount, eBase, response.data.rates[eBase]);
		  		ec.print();
		  	})
		  	.catch(function (error) {
		   		console.log(error);
		  	});	

};

//This method returns arguments from the command line as an array
function GetCLArguments(){
	var inputValues = [];
	for(var i = 2; i < process.argv.length; i++){
		inputValues.push(process.argv[i]);
	}
	return inputValues;
};



	

