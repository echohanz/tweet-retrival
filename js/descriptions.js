var warray = new Array();
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//TODO: Filter to just the written tweets
	for(var i = 0; i<tweet_array.length; i++){
		if(tweet_array[i].written){
			if(tweet_array[i].writtenText != ' '){
				warray.push(tweet_array[i]);
			}
		}
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var input = document.getElementById('textFilter');
	input.addEventListener('keyup', function(e){
		var inputs = e.target.value;
		document.getElementById('tweetTable').innerText = '';

		if(inputs == ""){
			document.getElementById('searchCount').innerText = 0;
			document.getElementById('searchText').innerText = inputs.toLowerCase()
		} else {
			var farray = warray.filter(f =>{
				return f.writtenText.includes(inputs.toLowerCase());
			});
			document.getElementById('searchCount').innerText = farray.length;
			document.getElementById('searchText').innerText = inputs.toLowerCase()
			for(var i = 0; i<farray.length; i++){
				let tr = document.createElement('tr')
				tr.innerHTML = farray[i].getHTMLTableRow(i+1)
				document.getElementById('tweetTable').append(tr);
			}
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
