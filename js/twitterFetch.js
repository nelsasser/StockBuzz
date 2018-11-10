function twitterFetch(){
  const url = 'http://stockbuzz-env.p7p8dnmtvv.us-east-2.elasticbeanstalk.com/twitter'

  var t = document.getElementById('ticker').value;
  var name = new Stock().requestStockQuote(t).name;
  var params = "name="+name

  var request = new XMLHttpRequest();

  request.open("GET", url+"?"+params, false);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(null);

  /*request.onload = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        return request.responseText;
      } else {
        console.error(request.statusText);
      }
    }
  };*/

  var responseData = request.responseText;
  var data = JSON.parse(responseData);

  return data;

}
