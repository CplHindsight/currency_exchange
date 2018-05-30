//Module declaration
const expect = require('chai').expect;
const nock = require('nock');

//Exported application modules
const getExchangeData = require('../test_modules').getExchangeData;

//Class creating JSON structured object
class ExchangedCurrency{

	constructor(date, bCurrency, amount, cCurrency, rate){
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
					Conversion Amount: ${this.conversion_amount}
				}`;
		}

	print(){
		return console.log(this.getObject());
	}

	setConversionAmount(amount){
		this.conversion_amount = amount;
	}
}

/*
	Important note about using Nock:

	Nock has cascading scopes regarding HTTP requests. As a result, any test using a mocked version of the HTTP request
	through Nock will cascade the HTTP request override to any test below the test instantiating Nock. 

	To prevent this cascade, after the test response has completed, ensure nock.cleanAll() is called. 
 */

//Unit Tests
describe("Unit Tests", ()=> {
	it("Test to determine successful creation of new class object", ()=> {
			var ec = new ExchangedCurrency("2011-06-03", "USD", 100, "CAD", 1.13);
			expect(typeof(ec)).to.equal('object');
	});
	it("Test to determine successful assignment of values into a new class object", ()=> {
			var ec = new ExchangedCurrency("2011-06-03", "USD", 100, "CAD", 1.13);
			expect(ec.date).to.not.equal(null);
			expect(ec.date).to.equal('2011-06-03');
			expect(ec.base_currency).to.not.equal(null);
			expect(ec.base_currency).to.equal("USD");
			expect(ec.base_amount).to.not.equal(null);
			expect(ec.base_amount).to.equal(100);
			expect(ec.conversion_currency).to.not.equal(null);
			expect(ec.conversion_currency).to.equal("CAD");
			expect(ec.conversion_amount).to.not.equal(null);
			expect(ec.conversion_amount).to.equal(parseFloat(100) * 1.13);
	});
	it("Creates an object with values as follows - Date: 2011-06-03, Base Currency: USD, Base Amount: 100, Conversion Currency: CAD, Conversion Amount: 97.85", () => {
			var ec = new ExchangedCurrency("2011-06-03", "USD", 100, "CAD", null);
			ec.setConversionAmount(97.85);
			expect(typeof(ec)).to.equal('object');
			ec.print();
	});
	it("Creates an object with values as follows - Date: 2007-07-12, Base Currency: GBP, Base Amount: 303, Conversion Currency: SEK, Conversion Amount: 4085.0157", () => {
			var ec = new ExchangedCurrency("2007-07-12", "GBP", 303, "SEK", null);
			ec.setConversionAmount(4085.0157);
			expect(typeof(ec)).to.equal('object');
			ec.print();
	});
	it("Creates an object with values as follows - Date: 2004-08-07, Base Currency: EUR, Base Amount: 5, Conversion Currency: PLN, Conversion Amount: 22.01", () => {
			var ec = new ExchangedCurrency("2004-08-07", "EUR", 5, "PLN", null);
			ec.setConversionAmount(22.01);
			expect(typeof(ec)).to.equal('object');
			ec.print();
	});
	it("Creates an object with values as follows - Date: 2017-02-09, Base Currency: ZAR, Base Amount: 132, Conversion Currency: TRY, Conversion Amount: 36.3528", () => {
			var ec = new ExchangedCurrency("2017-02-09", "ZAR", 132, "TRY	", null);
			ec.setConversionAmount(36.3528);
			expect(typeof(ec)).to.equal('object');
			ec.print();
	});
});

//Initial Integration Test
describe("Initial Integration Test Cases:", ()=> {
	it("Date: 2011-06-03, Base Currency: USD, Base Amount: 100, Conversion Currency: CAD, Conversion Amount: 97.85", ()=> {
		return getExchangeData('2011-06-03', 'USD', 'CAD')
			.then(response => {
				var ec = new ExchangedCurrency(response.date, response.base, 100, "CAD", response.rates["CAD"]);
				expect(typeof(response)).to.equal('object');
				expect(ec.date).to.equal('2011-06-03');
				expect(ec.base_currency).to.equal("USD");
				expect(ec.base_amount).to.equal(100);
				expect(ec.conversion_currency).to.equal("CAD");
				expect(ec.conversion_amount).to.equal(parseFloat(100) * response.rates["CAD"]);
			});
	});
	it("Date: 2007-07-12, Base Currency: GBP, Base Amount: 303, Conversion Currency: SEK, Conversion Amount: 4085.0157", ()=> {
		return getExchangeData('2007-07-12', 'GBP', 'SEK')
			.then(response => {
				var ec = new ExchangedCurrency(response.date, response.base, 303, "SEK", response.rates["SEK"]);
				expect(typeof(response)).to.equal('object');
				expect(ec.date).to.equal('2007-07-12');
				expect(ec.base_currency).to.equal("GBP");
				expect(ec.base_amount).to.equal(303);
				expect(ec.conversion_currency).to.equal("SEK");
				expect(ec.conversion_amount).to.equal(parseFloat(303) * response.rates["SEK"]);
			});
	});
	//This test fails as it returns a value 1 day short of what the expected value should be
	it("Date: 2004-08-07, Base Currency: EUR, Base Amount: 5, Conversion Currency: PLN, Conversion Amount: 22.01", ()=> {
		return getExchangeData('2004-08-07', 'EUR', 'PLN')
			.then(response => {
				var ec = new ExchangedCurrency(response.date, response.base, 5, "PLN", response.rates["PLN"]);
				expect(typeof(response)).to.equal('object');
				expect(ec.date).to.equal('2004-08-07');
				expect(ec.base_currency).to.equal("EUR");
				expect(ec.base_amount).to.equal(5);
				expect(ec.conversion_currency).to.equal("PLN");
				expect(ec.conversion_amount).to.equal(parseFloat(5) * response.rates["PLN"]);
			});
	});
	it("Date: 2017-02-09, Base Currency: ZAR, Base Amount: 132, Conversion Currency: TRY, Conversion Amount: 36.3528", ()=> {
		return getExchangeData('2017-02-09', 'ZAR', 'TRY')
			.then(response => {
				var ec = new ExchangedCurrency(response.date, response.base, 132, "TRY", response.rates["TRY"]);
				expect(typeof(response)).to.equal('object');
				expect(ec.date).to.equal('2017-02-09');
				expect(ec.base_currency).to.equal("ZAR");
				expect(ec.base_amount).to.equal(132);
				expect(ec.conversion_currency).to.equal("TRY");
				expect(ec.conversion_amount).to.equal(parseFloat(132) * response.rates["TRY"]);
			});
	});
});

//Additional Integration Test Cases
describe("Additional Integration Test Cases:", ()=> {
	it("Provides an unknown currency as a base, should return a 400 HTTP response", ()=> {
		return getExchangeData('2011-06-03', 'BLA', 'CAD')
			.then(response => {
			})
			.catch(error => {
				expect(error.response.status).to.equal(400);
			});
	});
	it("Provides an unknown currency as a conversion currency, should return a 400 HTTP response", ()=> {
		return getExchangeData('2011-06-03', 'USD', 'BAR')
			.then(response => {
			})
			.catch(error => {
				expect(error.response.status).to.equal(400);
			});
	});
	it("Provides an incorrect date format, should return a 400 HTTP response", ()=> {
		return getExchangeData('July 23, 2016', 'BLA', 'CAD')
			.then(response => {
			})
			.catch(error => {
				expect(error.response.status).to.equal(400);
			});
	});
	//This test needs to be updated should the provided date pass in the calendar
	it("Provides a date that has not occurred yet, should return a 400 HTTP response", ()=> {
		return getExchangeData('2018-09-03', 'BLA', 'CAD')
			.then(response => {
			})
			.catch(error => {
				expect(error.response.status).to.equal(400);
			});
	});
	it("Provides a date that is before the initial API documented starting year of 1999, should return a 400 HTTP response", ()=> {
		return getExchangeData('1998-09-03', 'BLA', 'CAD')
			.then(response => {
			})
			.catch(error => {
				expect(error.response.status).to.equal(400);
			});
	});
});	

//NOCK Integration Test Cases
describe("Initial Integration Test Case Example Using Nock:", ()=> {
	beforeEach(() => {
	    var scope = nock('https://exchangeratesapi.io')
	      .get('/api/2011-06-03?base=USD&symbols=CAD')
	      .reply(200, { base: 'USD', date: '2011-06-03', rates: { CAD: 0.9785339591 } });
  	});

	it("Correct Test Result Using NOCK -- Date: 2011-06-03, Base Currency: USD, Base Amount: 100, Conversion Currency: CAD, Conversion Amount: 97.85", ()=> {
		return getExchangeData('2011-06-03', 'USD', 'CAD')
			.then(response => {
				var ec = new ExchangedCurrency(response.date, response.base, 100, "CAD", response.rates["CAD"]);
				expect(typeof(response)).to.equal('object');
				expect(ec.date).to.equal('2011-06-03');
				expect(ec.base_currency).to.equal("USD");
				expect(ec.base_amount).to.equal(100);
				expect(ec.conversion_currency).to.equal("CAD");
				expect(ec.conversion_amount).to.equal(parseFloat(100) * response.rates["CAD"]);

				nock.cleanAll();
			});
	});
	it("Incorrect Test Result Using NOCK -- Expect 404 Response -- Date: 2011-06-03, Base Currency: GBP, Base Amount: 100, Conversion Currency: CAD, Conversion Amount: 97.85", ()=> {
		return getExchangeData('2011-06-03', 'GBP', 'CAD')
			.then(response => {

			})
			.catch(error => {
				expect(error.status).to.equal(404);
				nock.cleanAll();
			});
	});
});	



