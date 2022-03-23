function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//Part 1: Tweet dates
	var format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	document.getElementById('numberTweets').innerText = tweet_array.length;
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length -1].time.toLocaleDateString("en-US", format);
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString("en-US", format);
	
	//Part 1: Tweet categories
	var countce = 0;
	var countle = 0;
	var countac = 0;
	var countms = 0;
	var countuw = 0;
	tweet_array.forEach(e => {
		if (e.source == "completed_event"){
			countce += 1;
			if(e.written){
				countuw +=1;
			}
		}
		else if (e.source == "live_event"){
			countle += 1;
		}
		else if (e.source == "achievement"){
			countac += 1;
		}
		else if (e.source == "miscellaneous"){
			countms += 1;
		}
	});
	
	//update to html
	var ce = document.querySelectorAll('.completedEvents');
	for (var i = 0; i<ce.length; i++){
		ce[i].innerHTML = countce;
	}
	document.querySelector('.liveEvents').innerHTML = countle;
	document.querySelector('.achievements').innerHTML = countac;
	document.querySelector('.miscellaneous').innerHTML = countms;
	document.querySelector('.written').innerHTML = countuw;
	document.querySelector('.completedEventsPct').innerHTML = ((countce/tweet_array.length) * 100).toFixed(2) + '%';
	document.querySelector('.liveEventsPct').innerHTML = ((countle/tweet_array.length) * 100).toFixed(2) + '%';
	document.querySelector('.achievementsPct').innerHTML = ((countac/tweet_array.length) * 100).toFixed(2) + '%';
	document.querySelector('.miscellaneousPct').innerHTML = ((countms/tweet_array.length) * 100).toFixed(2) + '%';
	document.querySelector('.writtenPct').innerHTML = ((countuw/tweet_array.length) * 100).toFixed(2) + '%';
		
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
