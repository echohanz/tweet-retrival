function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	//resource https://juejin.cn/post/6844903502116814855
	var dicc = new Array();
	dicc['running'] = 0;
	dicc['walking'] = 0;
	dicc['workout'] = 0;
	dicc['others'] = 0;
	dicc['freestyle'] = 0;
	dicc['skiing'] = 0;
	dicc['swimming'] = 0;
	dicc['hiking'] = 0;
	dicc['biking'] = 0;
	
	var dicd = new Array();
	dicd['running'] = 0.0;
	dicd['walking'] = 0.0;
	dicd['workout'] = 0.0;
	dicd['others'] = 0.0;
	dicd['freestyle'] = 0.0;
	dicd['skiing'] = 0.0;
	dicd['swimming'] = 0.0;
	dicd['hiking'] = 0.0;
	dicd['biking'] = 0.0;
	dicd['test'] = 9.0;
	
	tweet_array.forEach(e => {
		if(e.activityType == 'running'){
			dicc['running'] += 1;
			dicd['running'] += e.distance;
		}
		if(e.activityType == 'walking'){
			dicc['walking'] += 1;
			dicd['walking'] += e.distance;
		}
		if(e.activityType == 'workout'){
			dicc['workout'] += 1;
			dicd['workout'] += e.distance;
		}
		if(e.activityType == 'others'){
			dicc['others'] += 1;
			dicd['others'] += e.distance;
		}
		if(e.activityType == 'freestyle'){
			dicc['freestyle'] += 1;
			dicd['freestyle'] += e.distance;
		}
		if(e.activityType == 'skiing'){
			dicc['skiing'] += 1;
			dicd['skiing'] += e.distance;
		}
		if(e.activityType == 'swimming'){
			dicc['swimming'] += 1;
			dicd['swimming'] += e.distance;
		}
		if(e.activityType == 'hiking'){
			dicc['hiking'] += 1;
			dicd['hiking'] += e.distance;
		}
		if(e.activityType == 'biking'){
			dicc['biking'] += 1;
			dicd['biking'] += e.distance;
		}
	});


	var res = Object.keys(dicc).sort(function(a,b){ return dicc[b]-dicc[a]; });
	document.getElementById('numberActivities').innerText = '8';
	document.getElementById('firstMost').innerText = res[0];
	document.getElementById('secondMost').innerText = res[1];
	document.getElementById('thirdMost').innerText = res[2];

	if(dicd[res[0]]>dicd[res[1]] && dicd[res[0]] > dicd[res[2]]){
		var firstdis = res[0];
		if(dicd[res[1]]> dicd[res[2]]){
			var seconddis = res[1];
			var thirddis = res[2];
		}
		else{
			var seconddis = res[2];
			var thirddis = res[1];
		}
	}
	else if(dicd[res[1]]>dicd[res[0]] && dicd[res[1]] > dicd[res[2]]){
		var firstdis = res[1];
		if(dicd[res[0]]> dicd[res[2]]){
			var seconddis = res[0];
			var thirddis = res[2];
		}
		else{
			var seconddis = res[2];
			var thirddis = res[0];
		}
	}
	else if(dicd[res[2]]>dicd[res[1]] && dicd[res[2]] > dicd[res[0]]){
		var firstdis = res[2];
		if(dicd[res[1]]> dicd[res[0]]){
			var seconddis = res[1];
			var thirddis = res[0];
		}
		else{
			var seconddis = res[0];
			var thirddis = res[1];
		}
	}
	
	var fresult;
	var lresult;
	if(firstdis == 'running'){
		fresult = 'run';
	}else if(firstdis == 'swimming'){
		fresult = 'swim';
	}else if(firstdis == 'walking'){
		fresult = 'walk';
	}else if(firstdis == 'biking'){
		fresult = 'bike';
	}else if(firstdis == 'skiing'){
		fresult = 'ski';
	}else if(firstdis == 'others'){
		fresult = 'do other things';
	}

	if(thirddis == 'running'){
		lresult = 'run';
	}else if(thirddis == 'swimming'){
		lresult = 'swim';
	}else if(thirddis == 'walking'){
		lresult = 'walk';
	}else if(thirddis == 'biking'){
		lresult = 'bike';
	}else if(thirddis == 'skiing'){
		lresult = 'ski';
	}else if(thirddis == 'others'){
		lresult = 'do other things';
	}
	
	document.getElementById('longestActivityType').innerText = fresult;
	document.getElementById('shortestActivityType').innerText = lresult;
	
	var weekdays;
	var weekends;
	tweet_array.forEach(e =>{
		if(e.activityType == firstdis){
			let weekdays = e.weekday;
			let weekends = e.weekend;
		}
	})
	
	if(weekdays > weekends){
		document.getElementById('weekdayOrWeekendLonger').innerText = 'weekday';
	}else{
		document.getElementById('weekdayOrWeekendLonger').innerText = 'weekend';
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 400,
	  "height": 400,
	  "data": {
	    "values": [
			{"activities": "Running", "count": dicc['running']},
			{"activities": "Walking", "count": dicc['walking']},
			{"activities": "Biking", "count": dicc['biking']},
			{"activities": "Hiking", "count": dicc['hiking']},
			{"activities": "Freestyle", "count": dicc['freestyle']},
			{"activities": "Workout", "count": dicc['workout']},
			{"activities": "Swimming", "count": dicc['swimming']},
			{"activities": "Others", "count": dicc['others']},
			
		]
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding" :{
		  "x": {"field": "activities", "type": "ordinal"},
		  "y": {"field": "count", "type": "quantitative"},
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	
	var disarray = [];
	for(var i = 0; i< tweet_array.length; i++){
		if(tweet_array[i].activityType==firstdis || tweet_array[i].activityType==seconddis || tweet_array[i].activityType==thirddis ){
			var format = {"activity": tweet_array[i].activityType, "day": tweet_array[i].whichday, "distance": tweet_array[i].distance};
			disarray.push(format);
		}
	}
	
	//Source: http://www.cache.one/read/16850504
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for all of the three most tweeted-about activities. ",
		"width": 500,
		"height": 400,
		"data": {
			"values": disarray
		},
		"mark": "point",
		"encoding": {
			"x": {"field": "day", "type": "ordinal"},
			"y": {"field": "distance", "type": "quantitative"},
		
		"color":{
			"field": "activity", "type": "nominal",
			"scale":{
				"domain": [firstdis, seconddis,thirddis],
				"range": ["#e72a19",  "#00aa7f", "#4555e7"]
			},
		},},
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	
	distance_Vis_Aggregated={
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for all of the three most tweeted-about activities, aggregating the activities by the mean. ",
		"width": 500,
		"height": 400,
		"data": {
			"values": disarray
		},
		"mark": "point",
		"encoding":{
			"x": {"field": "day", "type": "ordinal"},
			"y": {"aggregate": "average", "field": "distance","type": "quantitative"},
			"color": {"field":"activity", "type" : "nominal"}
		},
	};
	vegaEmbed('#distanceVisAggregated', distance_Vis_Aggregated, {actions:false});
	document.getElementById('distanceVisAggregated').style.display = 'none';
	
	
	
	document.getElementById("aggregate").addEventListener("click",function (){
		
		if(document.getElementById('aggregate').innerHTML == 'Show means'){
		document.getElementById('aggregate').innerHTML = "Show all activities";
		document.getElementById('distanceVis').style.display = 'none';
		document.getElementById('distanceVisAggregated').style.display = 'block';
		
		}
		else if(document.getElementById('aggregate').innerHTML == 'Show all activities'){
		document.getElementById('aggregate').innerHTML = 'Show means';
		document.getElementById('distanceVisAggregated').style.display = 'none';
		document.getElementById('distanceVis').style.display = 'block';
		
		}
		
	});

}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	
});
