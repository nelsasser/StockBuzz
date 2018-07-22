/**
@author: Nick Elsasser
*/
function TweetBuilder() {

}

TweetBuilder.prototype.buildTweet = function(handle_name, message_data, time, profile_src, like, retweets) {
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

	//append user_meta top tweet
	tweet.appendChild(user_meta);

	//append tweet to lower_tweets
	lower_tweets.appendChild(tweet);
}