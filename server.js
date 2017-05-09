var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

var jPlayerFactory = require(__dirname + "/player.js");
var jGame = require(__dirname + "/game.js");

var aNicknames = [];

io.on("connection", function(oSocket){  //everything about the connection with the client happens here
	io.emit("active players", {"nicknames":aNicknames});

	let jPlayer = {};

	oSocket.on("register player", function(jData){
		let sNickname = jData.name;
		aNicknames.push(sNickname);

		jPlayer = jPlayerFactory.fnCreatePlayer(sNickname, oSocket);
		jGame.aPlayers.push(jPlayer);
		console.log("REGISTER PLAYER: " + jPlayer);

		io.emit("active players", {"nicknames":aNicknames});
		console.log("SENDING PLAYERS: " + aNicknames);

		if (jGame.aPlayers.length > 0 && jGame.aPlayers.length % 2 == 0) {
			jGame.fnMatchPlayers();
			console.log("MATCH"+jGame.aMatches);
		}
	});

	oSocket.on("this is the choice", function(jData){
		jPlayer.choice = jData.choice;
		console.log(jPlayer.nickname + ": " + jPlayer.choice);
		var result = jGame.fnGetPlayerChoice(jPlayer.nickname, jPlayer.choice);
		oSocket.emit("the result", result);
	});
});



app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

server.listen(80, function(){
	console.log("SERVER RUNNING");
});