class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if(this.text.toLowerCase().includes("completed") || this.text.toLowerCase().includes("posted")){
			return "completed_event";
		}
		else if(this.text.toLowerCase().includes("right now") || this.text.toLowerCase().includes("watch")){
			return "live_event";
		}
		else if(this.text.toLowerCase().includes("achieve") || this.text.toLowerCase().includes("goal") || this.text.toLowerCase().includes("met")){
			return "achievement";
		}
		else{
			return "miscellaneous";
		}
		
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
		if (this.text.toLowerCase().includes(" - ")){
			return true;
		}
		else{
        return false;
		}
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.text.substring(this.text.indexOf(" - "), this.text.indexOf("https"));
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
		var res = '';
        if(this.text.toLowerCase().includes("workout")){
			res = "workout";
		}
		else if(this.text.toLowerCase().includes("walk")){
			res = "walking";
		}
		else if(this.text.toLowerCase().includes("swim")){
			res = "swimming";
		}
		else if(this.text.toLowerCase().includes("activity")){
			res = "others";
		}
		else if(this.text.toLowerCase().includes("freestyle")){
			res = "freestyle";
		}
		else if(this.text.toLowerCase().includes("hike")){
			res = "hiking";
		}
		else if(this.text.toLowerCase().includes("bike")){
			res = "biking";
		}
		else if(this.text.toLowerCase().includes("run")){
			res = "running";
		}
		return res;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }else{
        //TODO: prase the distance from the text of the tweet
		var temp;
		var res = 0;
		if(this.text.toLowerCase().includes(' km ') && !this.text.toLowerCase().includes(' mi ')){
			let texttt = this.text.split(' ');
			for (var i = 0; i< texttt.length; i++){
				if(texttt[i] == 'km'){
					temp = parseFloat(texttt[i-1]);
					res += temp / 1.609;
					return parseFloat(res.toFixed(2));
				}
			}
		}
		else if(this.text.toLowerCase().includes(' mi ') && !this.text.toLowerCase().includes(' km ')){
			let texttt = this.text.split(' ');
			for (var i = 0; i< texttt.length; i++){
				if(texttt[i] == 'mi'){
					temp = parseFloat(texttt[i-1]);
					res += temp;
					return parseFloat(res.toFixed(2));
				}
			}
		}
		
		return 0;
		
		}
        
    }

	get weekday():number {
		var weekday = 0;
		if(this.time.getDay()<=5){
			weekday += 1;
		}
		return weekday;
	}
	
	get weekend():number{
		var weekend = 0;
		if(this.time.getDay() > 5){
			weekend += 1;
		}
		return weekend;
	}
	get whichday():string {
		var res='';
		if(this.time.getDay()==5){
			res = "Friday";
		}
		else if(this.time.getDay()==4){
			res = "Thursday";
		}
		else if(this.time.getDay()==3){
			res = "Wednesday";
		}
		else if(this.time.getDay()==2){
			res = "Tuesday";
		}
		else if(this.time.getDay()==1){
			res = "Monday";
		}
		else if(this.time.getDay()==6){
			res = "Saturday";
		}
		else if(this.time.getDay()==0){
			res = "Sunday";
		}
		return res;
		
	}
	
    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
		var surl = this.text.search("https://");
        var res = this.text.substring(surl, -1);
        return `
            <th scope="row">${rowNumber}</th>
            <td>${this.activityType}</td>
            <td>${res}<a href="${this.text.substring(surl, surl+23)}">${this.text.substring(surl, surl+23)}</a> #RunKeeper</td>
        `;
	}
}
