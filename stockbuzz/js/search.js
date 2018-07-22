document.getElementById("ticker").addEventListener("keydown", function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { search(); }
}, false)

function search() {
  genStockData();
  var data = twitterFetch();

  var statuses = data.statuses;

  var builder = new TweetBuilder();
  
  statuses.forEach(function(status) {
  	var msg = status.text;
  	var handle = status.user.screen_name;
  	var date = status.created_at;
  	var retweet = status.retweet_count;
  	var like = status.favorite_count;
  	var profile_pic = status.user.profile_image_url;

  	console.log(profile_pic);

  	builder.buildTweet(handle, msg, date, profile_pic, like, retweet);
  });
}