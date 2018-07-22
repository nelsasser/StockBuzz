document.getElementById('ticker').onkeydown = function(event) {
  if (event.keyCode == 13) {
    findStock()
  }
}

function findStock() {
  var ticker = document.getElementById("ticker").value;
  var stock = new Stock();
  var s = stock.requestStockQuote(ticker);

  var div = document.createElement('div');
  div.id = 'quote'
  div.className = 'quote';
  document.getElementById('main').appendChild(div);
}