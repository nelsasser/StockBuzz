function Stock() {

}

Stock.prototype.requestStockQuote = function(ticker) {
	const url = 'https://api.iextrading.com/1.0'

	var helper = "/stock/" + ticker + "/quote"

	var request = new XMLHttpRequest();
	request.open('GET', url + helper, false);
	request.send(null);
	
	var reponseData = request.responseText;
	var jsonResponse = JSON.parse(reponseData);

	return {
		open: jsonResponse.open,
		latest: jsonResponse.latestPrice
	};
};