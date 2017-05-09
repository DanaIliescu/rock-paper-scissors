var jMatch = require(__dirname + "/match.js");

var jGame = {
				"aPlayers" : [],
				"aTempPlayers": [],
				"aMatches" : []
			};

/****************************************************************************************************/
jGame.fnMatchPlayers = function() {
	jMatch = jMatch.fnCreateMatch(jGame.aPlayers[0], jGame.aPlayers[1]);
	jGame.aMatches.push(jMatch);


	console.log(jGame.aPlayers);
	console.log(jGame.aTempPlayers);
	console.log("MATCHES: " + jGame.aMatches[0].player.nickname + " VS " + jGame.aMatches[0].oponent.nickname);
	
}

jGame.fnGetPlayerChoice = function(sNickname, sChoice) {
	if (typeof jGame.aMatches[0] !== "undefined") {
		if (jGame.aMatches[0].player.nickname == sNickname) {
			jGame.aMatches[0].player.choice = sChoice;
		} else {
			jGame.aMatches[0].oponent.choice = sChoice;
		}

		console.log("PLAYER: " + jGame.aMatches[0].player.choice + " OPONENT: " + jGame.aMatches[0].oponent.choice);

		if ("undefined" !== typeof jGame.aMatches[0].player.choice && "undefined" !== typeof jGame.aMatches[0].oponent.choice){
	    	console.log(jGame.fnGetResult(jGame.aMatches[0]));

	    	if (jGame.aMatches[0].wins.player == 2) {
				console.log("------------------ MATCH ENDED " + jGame.aMatches[0].player.nickname + " WON -------------------");
				return {"winner": jGame.aMatches[0].player.nickname, "loser": jGame.aMatches[0].oponent.nickname};
	    	} 

	    	if (jGame.aMatches[0].wins.oponent == 2) {
	    		console.log("------------------ MATCH ENDED " + jGame.aMatches[0].oponent.nickname + " WON -------------------");
				return {"winner": jGame.aMatches[0].oponent.nickname, "loser": jGame.aMatches[0].player.nickname};
	    	}

	    	jGame.aMatches[0].player.choice = undefined;
	    	jGame.aMatches[0].oponent.choice = undefined;
		}
	}
}

jGame.fnGetResult = function(jMatch) {
	let playerChoice = jMatch.player.choice;
	let oponentChoice = jMatch.oponent.choice;

	if (jMatch.wins.player == 2 || jMatch.wins.oponent == 2) {
		jMatch.wins.player = 0;
		jMatch.wins.oponent = 0;
	}

	console.log("WINS " + jMatch.wins);
	console.log("CHOICES " + playerChoice + " op " + oponentChoice);
	
	//EVEN
	if ( playerChoice == oponentChoice) {
		console.log("--------- EVEN ---------");	
		return {"status":"even"};
	} else {
	 	console.log ("-------- NOT EVEN ----------");

	    //WINNER
	    if (playerChoice == "rock" && oponentChoice == "scissors" || oponentChoice == "rock" && playerChoice == "scissors") {
	    	if (playerChoice == "rock") {
				jMatch.wins.player ++;
	    		return {"status":"winner", "nickname": jMatch.player.nickname};
	    	} else {
	    		jMatch.wins.oponent ++;
	    		return {"status":"winner", "nickname": jMatch.oponent.nickname};
	    	}
	    }

	    if (playerChoice == "paper" && oponentChoice == "rock" || oponentChoice == "paper" && playerChoice == "rock") {		
            if (playerChoice == "paper") {
				jMatch.wins.player ++;
	    		return {"status":"winner", "nickname": jMatch.player.nickname};
	    	} else {
	    		jMatch.wins.oponent ++;
	    		return {"status":"winner", "nickname": jMatch.oponent.nickname};
	    	}
    	}

    	if (playerChoice == "scissors" && oponentChoice == "paper" || oponentChoice == "scissors" && playerChoice == "paper") {
            if (playerChoice == "scissors") {
				jMatch.wins.player ++;
         		return {"status":"winner", "nickname": jMatch.player.nickname};
	    	} else {
	    		jMatch.wins.oponent ++;
	    		return {"status":"winner", "nickname": jMatch.oponent.nickname};
	    	}
    	}
	}
}

/****************************************************************************************************/
jGame.fnGetRandomNumber = function(iMin, iMax) {
	var iRandomNumber = Math.round(Math.random()* (iMax - iMin)) + iMin;
	return iRandomNumber;
}


module.exports = jGame;