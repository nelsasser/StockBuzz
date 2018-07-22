/**
@author: Nick Elsasser
*/
function TweetBuilder() {

}

TweetBuilder.prototype.destroyAllTweets = function() {
	var tweets = document.getElementsByClassName('tweet');

	while(tweets.length > 0) {
		tweets[0].parentNode.removeChild(tweets[0]);
	}
}

TweetBuilder.prototype.buildTweet = function(handle_name, message_data, time, profile_src, likes, retweets) {
	//get the lower tweets div to append stuff too
	var par = document.getElementById('lower_tweets');

	//the actual tweet data
	var tweet = document.createElement('div');
	tweet.className = 'tweet';

	/*
	CREATE USER DATA
	*/
	//user profile data
	var user_data = document.createElement('div');
	user_data.className = 'user_data';

	//profile picture
	var profile = document.createElement('img');
	profile.className = 'profile';
	profile.alt = 'Profile Picture';
	profile.src = profile_src;
	profile.height = '32px';
	profile.width = '32px';
	//append profile picture to user_data
	user_data.appendChild(profile);

	//user handle
	var handle = document.createElement('p');
	handle.className = 'handle';
	handle.innerHTML = handle_name;
	//append to user_data
	user_data.appendChild(handle);

	//append user_data to tweet
	tweet.appendChild(user_data);

	/*
	CREATE USER MESSAGE
	*/
	var user_message = document.createElement('div');
	user_message.className = 'user_message';

	//message
	var message = document.createElement('p');
	message.className = 'message';
	message.innerHTML = message_data;

	//append message to user_message
	user_message.appendChild(message);

	//appennd user_message to tweet
	tweet.appendChild(user_message);

	/*
	CREATE USER META
	*/
	var user_meta = document.createElement('div');
	user_meta.className = 'user_meta';

	var timestamp = document.createElement('p');
	timestamp.className = 'time-stamp';
	timestamp.innerHTML = time;

	//appennd timestamp to user_meta
	user_meta.appendChild(timestamp);

	var like_container = document.createElement('div');
	like_container.className = 'like_container';

	var like = document.createElement('p');
	like.className = 'like';
	like.innerHTML = likes;

	var like_icon = document.createElement('img');
	like_icon.className = 'icon';
	like_icon.alt = 'like-icon';
	like_icon.src = './icons/like.svg';
	like_container.appendChild(like);
	like_container.appendChild(like_icon);
	user_meta.appendChild(like_container);

	var retweet_container = document.createElement('div');
	retweet_container.className = 'retweet_container';

	var retweet = document.createElement('p');
	retweet.className = 'retweet';
	retweet.innerHTML = retweets;

	var retweet_icon = document.createElement('img');
	retweet_icon.className = 'icon';
	retweet_icon.alt = 'retweet-icon';
	retweet_icon.src = './icons/rt.svg';
	retweet_container.appendChild(retweet);
	retweet_container.appendChild(retweet_icon);
	user_meta.appendChild(retweet_container);


	//append user_meta top tweet
	tweet.appendChild(user_meta);

	//append tweet to lower_tweets
	lower_tweets.appendChild(tweet);
}