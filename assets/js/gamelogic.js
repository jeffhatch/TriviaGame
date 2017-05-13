
	// Create a trivia form with multiple choice or true/false options (your choice).

	// Create variables to begin the countdown, questions and correct answers

	var intervalId;
	var score = 0;
	var timeCountdown = {id: "remainingTime", remainingTime: 25};

	var gameContentArray = [
			
		q1 = {
				id: "q1",
				questions: "What costume did both Ross and his date wear out to dinner?",
				choices: ["Cowgirl", "Princess", "Turkey", "Fairy"],
				correctAnswer: "Fairy"
			},

		q2 = {
				id: "q2",
				questions: "What was Ross’ middle name?",
				choices: ["Muriel", "Carlos", "Eustace", "Bertrand"],
				correctAnswer: "Eustace"
			},

		q3 = {
				id: "q3",
				questions: "What did Joey buy Chandler as a token of their friendship, which Chandler hated?",
				choices: ["Duck", "Foosball Table", "Sweater", "Bracelet"],
				correctAnswer: "Bracelet"
		},

		q4 = {
				id: "q4",
				questions: "Where were Ross and Emily supposed to go for their honeymoon?",
				choices: ["Athens", "Paris", "London", "New Jersey"],
				correctAnswer: "Athens"
		},

		q5 = {
				id: "q5",
				questions: "What was the name of the bald headed girl who Ross dumps for Rachel at the beach?",
				choices: ["Sue", "Bonnie", "Karen", "Mr. Clean"],
				correctAnswer: "Bonnie"
		},

		q6 = {
				id: "q6",
				questions: "What is the name of Joey's sister who punches Chandler?",
				choices: ["Kristen", "Tanisha", "Cookie", "Adrien"],
				correctAnswer: "Cookie"
		},		
	];




	

	 


	function startGame() {
		$("#start").remove();
		intervalId = setInterval(countDown, 1000);

		var time = $("<div>")
		time.addClass("choices");
	    time.attr("id", timeCountdown.id);
	    time.html("<h2>Time remaining: " + timeCountdown.remainingTime + " seconds</h2>");
	    $("#header").append(time);

		for (var i = 0; i < gameContentArray.length; i++) {

	            var a = $("<div>");
	            a.addClass("choices");
	            a.attr("id", gameContentArray[i].id);
	            a.text(gameContentArray[i].questions);
	            $("#header").append(a);
	            $("#" + gameContentArray[i].id).append("<br>");

	            for (var j = 1; j < gameContentArray[i].choices.length + 1; j++) {
	            	var b = $("<input type='radio'>");
	            	b.addClass("choices");
	            	b.attr("name", gameContentArray[i].id);
	            	b.attr("id", gameContentArray[i].id + "-" + j);
	            	b.attr("value", gameContentArray[i].choices[j-1]);
	            	$("#" + gameContentArray[i].id).append(b);
	            	var bLabel = $("<label>");
	            	bLabel.addClass("choices");
	            	bLabel.attr("for", gameContentArray[i].id + "-" + j);
	            	bLabel.text(gameContentArray[i].choices[j-1]);
	            	$("#" + gameContentArray[i].id).append(bLabel);
	            }
	        }
	}



	function countDown() {
	    timeCountdown.remainingTime--;
	    $("#remainingTime").html("<h2>Time remaining: " + timeCountdown.remainingTime + " seconds</h2>");
	    if (timeCountdown.remainingTime === 0) {
	    	timeUp();
	    }
	}

	function timeUp() {
		$("#remainingTime").html("<h2>Time is Up!</h2>");
		clearInterval(intervalId);

		for (var i = 0; i < gameContentArray.length; i++) {
			for (var j = 1; j < gameContentArray[i].choices.length + 1; j++) {
				if ($("#" + gameContentArray[i].id + "-" + j).is(':checked')) {
					var userGuess = $("#" + gameContentArray[i].id + "-" + j).val();
					if (userGuess === gameContentArray[i].correctAnswer) {
						score++;
					}
				}
			}	
		}

		$("#header").append("<h2 id='score'>Your score: " + score + "</h2>");
		var resetButton = $("<button>");
		resetButton.attr("id", "reset");
		resetButton.text("Reset Game");
		$("#header").append(resetButton);
		$("#reset").on("click", resetGame);
	}

	// The player will have a limited amount of time to finish the quiz.
	// Set the time in the beginning variable of timeCountdown and in the resetGame function

	function resetGame() {
		$("#reset").remove();
		$(".choices").remove();
		$("#score").remove();
		timeCountdown.remainingTime = 25; // time to match timeCountdown varible at the beginning
		$("#container").append("<button id='start'><h3>Click Here to Start!</h3></button>");
		$("#start").on("click", startGame);
	}

	// Start button to hide the contents of the page. Once the "start" is clicked, then show the questions/answers and the countdown
	$("#start").on("click", startGame);
