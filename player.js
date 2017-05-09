var jPlayerFactory = {};

jPlayerFactory.fnCreatePlayer = function(sNickname, oSocket) {
	var jNewPlayer = {"nickname": sNickname, 
					  "socket": oSocket};
	return jNewPlayer;
}

module.exports = jPlayerFactory;
