document.getElementById("ticker").addEventListener("keydown", function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { search(); }
}, false)

function search() {
  genStockData();
  twitterFetch()
}