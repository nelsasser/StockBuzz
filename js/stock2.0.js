/**
*/

/*
NEEDS TO BE OBFUSCATED BEFORE RELEASE
*/
var api_key = '-';

var ctx;
var chart;

window.onload = function(){
	init();
}

function init() {
	ctx = document.getElementById('stock_chart').getContext('2d');
	chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					data: [],
					label: "",
					fill: true,
					backgroundColor: '',
					borderColor: ''
				}]
			}
		});
}

function findStock(ticker){
	var stock = new Stock();
	var s = stock.requestStockQuote(ticker);

	var latest = s.latest;
	var open = s.open;
	var diff = open - latest;
	var name = s.name;

	return {
		latest: latest,
		open: open,
		diff: diff,
		name: name
	}

	return data;
}

function getTicker() {
	return document.getElementById('ticker').value;
}

function genStockData() {
	/*
	creates the nice, beautifully animated graph
	*/
	{
		var ticker = document.getElementById("ticker").value;
		var stockData = findStock(ticker);

		if(ctx === undefined) {
			ctx = document.getElementById('stock_chart');
		}

		if(chart === undefined) {
			chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						data: [],
						label: "",
						fill: true,
						backgroundColor: '',
						borderColor: ''
					}]
				}
			});
		}

		if(stockData === null) {
			console.log("Stock ticker not found.");
		} else {
			updateChart(ticker, stockData);
		}
	}

	/*
	creates the basic info for the stock next to the graph
	*/
	{
		var name = stockData.name;
		var open = stockData.open;
		var latest = stockData.latest;
		var diff = open - latest;

		document.getElementById('name').innerHTML = name;

		//remove old triangle if it exists
		var old_tri = document.getElementById('ticker_tri');
		if(old_tri != undefined) {
			old_tri.parentNode.removeChild(old_tri);
		}

		var tri = document.createElement('div');
		tri.id = 'ticker_tri';


		var di = diff.toFixed(2);

		if(diff < 0) {
			tri.className = 'arrow-down';
			document.getElementById('diff').className = 'red_text';
			di = "- " + di * -1;
		} else {
			tri.className = 'arrow-up';
			document.getElementById('diff').className = 'green_text';
			di = "+ " + di;
		}

		document.getElementById('info').appendChild(tri);
		document.getElementById('diff').innerHTML = di;
	}
}

function updateChart(ticker, stockData) {
	var stock = new Stock();

	//get data
	chartData = stock.requestStockChartData(ticker, api_key);

	//set new data points
	chart.data.labels = chartData.dates;
	chart.data.datasets[0].data = chartData.open;
	chart.data.datasets[0].label = stockData.name + " Stock Value";
	chart.data.datasets[0].fill = true;

	//set colors
	var colors = getChartColors(stockData.diff);
	chart.data.datasets[0].backgroundColor = colors.bg;
	chart.data.datasets[0].borderColor = colors.line;

	//set updates
	chart.update();
}

function getChartColors(difference) {
	var color_area;
	var color_line;

	//select chart colors

	//red for companies going down
	//green for go!
	console.log();
	if(difference < 0) {
		color_area = [255, 131, 107];
		color_line = [239, 101, 74];
	} else {
		color_area = [182, 226, 142];
		color_line = [147, 211, 91];
	}

	var bg = 'rgba(' + color_area[0] + "," + color_area[1] + "," + color_area[2] + "," + ".25)"
	var line = 'rgba(' + color_line[0] + ',' + color_line[1] + ',' + color_line[2] + ',' + ".5)"

	return {
		bg,
		line
	}
}

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
		latest: jsonResponse.latestPrice,
		close: jsonResponse.close,
		name: jsonResponse.companyName
	};
};

Stock.prototype.requestStockChartData = function(ticker, key) {
	//get stock over a one month period

	//get current date
	/* currentDate = new Date();
	var cDD = currentDate.getDate();
	var cMM = currentDate.getMonth() + 1;
	var cYYYY = currentDate.getFullYear();

	if(cDD<10) {
    	cDD = '0'+ cDD;
	} 

	if(cMM<10) {
    	cMM = '0'+ cMM;
	} 

	 var end_date = cYYYY + "-" + cMM + "-" + cDD;

	//get prev date
	var sDate = currentDate - 1000 * 60 * 60 * 24 * 30;
	var endDate = new Date(sDate);

	var eDD = endDate.getDate();
	var eMM = endDate.getMonth() + 1;
	var eYYYY = endDate.getFullYear();

	if(eDD < 10) {
		eDD = '0' + eDD;
	}

	if(eMM < 10) {
		eMM = '0' + eMM;
	}*/

	//var start_date = eYYYY + "-" + eMM + "-" + eDD;

	var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=" + key;
	/*var dataset = "/" + ticker;
	var return_format = ".json";
	
	var full_url = url + dataset + return_format + "?api_key=" + key;*/

	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);

	var response = JSON.parse(request.responseText);

	//console.log(response);

	//get the high, low, open for the last 30 days
	var date = [];
	var open = [];
	var high = [];
	var low = [];
	var close = [];

	try {
		var data = response["Time Series (Daily)"];
	} catch {
		console.log('bad ticker');
		return false;
	}

	var d = Object.keys(data);

	//var length = Math.min(30, data.length);

	for(var i = 0; i < d.length; i++) {
		date.push(d[i]);
		open.push(parseFloat(data[d[i]]["1. open"]));
		high.push(parseFloat(data[d[i]]["2. high"]));
		low.push(parseFloat(data[d[i]]["3. low"]));
		close.push(parseFloat(data[d[i]]["4. close"]));
	}

	return {
		dates: date.reverse(),
		open: open.reverse(),
		high: high.reverse(),
		low: low.reverse(),
		close: close.reverse()
	}; 
}
	
