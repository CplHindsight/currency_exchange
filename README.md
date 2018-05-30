Currency Exchange Application
Author: Darren Laser
Date: May 29, 2018
Version: 1.0
Software: Node, Axios, Nock, Chai, Mocha

README

This application provides currency exchanges between two currencies based on rates provided by the European Central Bank. 
All exchange rates are received through request to the API https://exchangeratesapi.io/.

Setup
-----
Ensure Node.js is installed and is set in your global path before running this application. 
This application runs through the command line interface.
To open a command line interface from a specific directory, navigate to the directory and hold shift and right click.
The command window option should become available.

Running the Application
-----------------------
To run the application, follow the steps below:

1. Navigate to the directory containing the index.js file.
2. Open a command line interface from the dirctory.
3. The following command structure will run the application:

	npm index.js yyyy-mm-dd base_currency base_amount conversion_currency
	
	Substitute the values in step 3 above as follows:

	yyyy-mm-dd: 2017-06-03
	base_currency: USD
	base_amount: 100
	conversion_currency: CAD

	A full example of the command is shown as follows:

	npm index.js 2017-06-03 USD 100 CAD

4. The command line will output the result of the query. A sample output is shown below.

	{
   	  Date: 2017-06-03,
          Base Currency: USD,
          Base Amount: 100,
          Conversion Currency: CAD,
          Conversion Amount: 135.23
        }

Unit and Integration Testing
----------------------------
To run unit and integration tests, follow the steps below:

1. Navigate to the directory containing the index.js file.
2. Open a command line interface.
3. Type the following command: npm test
4. Unit tests as well as integration tests will be executed, providing successful or unsuccessful results.

Test Mocking
------------
There are both Live URL and mocked versions of tests provided. Note that the Live URL tests will fail without
an active internet connection.

Known Test Failures
-------------------
It is known that the 3rd test of the Initial Integration Test block fails, as the date returned by the API returns an expected
single day off the expected date.
