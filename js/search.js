document.getElementById("ticker").addEventListener("keydown", function(e) {
  // Enter is pressed
  if (e.keyCode == 13) { search(); }
}, false)

function search() {
  genStockData();

  var data = twitterFetch();

  var statuses = data.statuses;

  var builder = new TweetBuilder();

  //destroy old tweets
  builder.destroyAllTweets();

  var tweets = []
  
  statuses.forEach(function(status) {
  	var msg = status.text;
  	var handle = status.user.screen_name;
  	var date = status.created_at;
  	var retweet = status.retweet_count;
  	var like = status.favorite_count;
  	var profile_pic = status.user.profile_image_url;

  	tweets.push({
  		msg,
  		handle,
  		date,
  		retweet,
  		like,
  		profile_pic
  	});

  	//console.log(profile_pic);
  });

  //grab the most liked tweets
  var liked_tweets = tweets.sort(function(a, b) {
  	return (a.like + a.retweet) - (b.like + b.retweet);
  }).reverse().slice(0, 15);

  //build those tweets
  liked_tweets.forEach(function(t) {
  	builder.buildTweet(t.handle, t.msg, t.date, t.profile_pic, t.like, t.retweet);
  });
}