document.getElementById('ticker').onkeydown = function(event) {
  if (event.keyCode == 13) {
    findStock()
  }
}

function findStock() {
  var ticker = document.getElementById("ticker").value;
  console.log(ticker);
}